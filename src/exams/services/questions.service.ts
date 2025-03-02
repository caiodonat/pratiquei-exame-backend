import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { QuestionCreateDto } from '../dto/question-create.dto';
import { QuestionEntity } from '../entities/question.entity';
import { QuestionRepository } from '../repositories/questions.repository';
import { QuestionUniqueDto } from '../dto/question-unique.dto';
import { QuestionSearchDto } from '../dto/question-search.dto';
import { AlternativeCreateDto } from '../dto/alternative-create.dto';
import { QuestionSelectDto } from '../dto/question-select.dto';
import { QUESTION_TYPE } from '../enums/questionType.enum';
import { QuestionIncludeDto } from '../dto/question-include.dto';

@Injectable()
export class QuestionsService {

	constructor(
		private readonly _repository: QuestionRepository,
	) { }

	/**
	 * @todo
	 * - gerar ordem com base na ordem dos items, caso não informado.
	 */
	public async newQuestion(dto: QuestionCreateDto) {
		const question = dto.toEntity();

		const questionRelated = await this.findQuestionByUnique(dto);
		if (questionRelated) {
			throw new UnprocessableEntityException(`Código já em uso`);
		}

		question.alternatives = [];

		if (dto.alternatives && dto.alternatives.length > 0) {
			for (let i = 0; i < dto.alternatives.length; i++) {
				const element = dto.alternatives[i];
				element.questionId = question.id;

				question.alternatives.push(new AlternativeCreateDto(element).toEntity());
			}
		}

		this.validateQuestionAlternativesByQuestionType(question);


		return await this._repository.createQuestion(question);
	}

	public async searchQuestions(search: QuestionSearchDto, include?: QuestionIncludeDto) {
		return await this._repository.selectManyQuestions(search, include);
	}

	public async listAllQuestion(select: QuestionSelectDto) {
		return await this._repository.selectAllQuestionWithSelect(select);
	}

	public async findQuestionByUnique(unique: QuestionUniqueDto, include?: QuestionIncludeDto) {
		this.validatingQuestionUniques(unique);

		return await this._repository.selectSafeQuestionByUnique(unique, include);
	}

	// public async changeQuestion(id: QuestionEntity['id'], updateQuestionDto: UpdateQuestionDto) {
	// 	// return await this._repository.updateQuestion(id, updateQuestionDto);
	// }

	public async removeQuestion(id: QuestionEntity['id']) {
		return await this._repository.deleteQuestionById(id);
	}

	private validateQuestionAlternativesByQuestionType(entity: QuestionEntity) {
		const alternativesCorrects = entity.alternatives.filter(e => e.isCorrect == true);

		switch (entity.typeCode) {
			case QUESTION_TYPE.MULTIPLE_SINGLE:

				if (alternativesCorrects.length != 1)
					throw new UnprocessableEntityException(`"Questão" só pode ter uma "Alternativas" correta.`);

				if (entity.discursiveAnswer)
					throw new UnprocessableEntityException(`"Questão" não pode possuir resposta discursiva.`);

				break;

			case QUESTION_TYPE.MULTIPLE_MANY:

				if (alternativesCorrects.length < 1)
					throw new UnprocessableEntityException(`"Questão" tem que ter mais de uma "Alternativas" correta.`);

				if (entity.discursiveAnswer)
					throw new UnprocessableEntityException(`"Questão" não pode possuir resposta discursiva.`);

				break;

			case QUESTION_TYPE.DISCURSIVE:

				if (!entity.discursiveAnswer)
					throw new UnprocessableEntityException(`"Questão" tem que ter possuir resposta discursiva.`);
				if (entity.alternatives && entity.alternatives.length > 0)
					throw new UnprocessableEntityException(`"Questão" não pode possuir alternativas.`);
				break;

			default:
				break;
		}

	}

	private validatingQuestionUniques(unique: QuestionUniqueDto) {
		if (!unique.id && !unique.code)
			throw new UnprocessableEntityException(`Dado único de "Questão" não informado`);
	}
}

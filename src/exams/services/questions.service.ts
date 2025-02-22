import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { QuestionCreateDto } from '../dto/question-create.dto';
import { QuestionEntity } from '../entities/question.entity';
import { QuestionRepository } from '../repositories/questions.repository';
import { QuestionUniqueDto } from '../dto/question-uniques.dto';
import { QuestionSearchDto } from '../dto/question-search.dto';
import { AlternativeCreateDto } from '../dto/alternative-create.dto';

@Injectable()
export class QuestionsService {

	constructor(
		private readonly _repository: QuestionRepository,
	) { }

	/**
	 * @todo
	 * - gerar ordem com base na ordem dos items, caso não informado.
	 * - validar `dto.alternatives[].isCorrect` com `dto.typeCode`.
	 */
	public async newQuestion(dto: QuestionCreateDto) {
		const question = dto.toEntity();

		const questionRelated = await this.findQuestionByUnique(dto);
		if (questionRelated) {
			throw new UnprocessableEntityException(`Código já em uso`);
		}

		question.alternatives = [];

		for (let i = 0; i < dto.alternatives.length; i++) {
			const element = dto.alternatives[i];

			question.alternatives.push(new AlternativeCreateDto(element).toEntity());
		}

		return await this._repository.createQuestion(question);
	}

	public async searchQuestions(search: QuestionSearchDto) {
		return await this._repository.selectManyQuestions(search);
	}

	public async findQuestionByUnique(uniques: QuestionUniqueDto) {
		return await this._repository.selectSafeQuestionById(uniques);
	}

	// public async changeQuestion(id: QuestionEntity['id'], updateQuestionDto: UpdateQuestionDto) {
	// 	// return await this._repository.updateQuestion(id, updateQuestionDto);
	// }

	public async removeQuestion(id: QuestionEntity['id']) {
		return await this._repository.deleteQuestionById(id);
	}
}

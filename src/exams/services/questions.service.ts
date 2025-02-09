import { Inject, Injectable } from '@nestjs/common';
import { QuestionCreateDto } from '../dto/question-create.dto';
import { QuestionEntity } from '../entities/question.entity';
import { QuestionRepository } from '../repositories/questions.repository';

@Injectable()
export class QuestionsService {

	constructor(
		private readonly _repository: QuestionRepository,
	) { }

	public async newQuestion(dto: QuestionCreateDto) {
		const question = dto.toEntity();

		console.debug(question);
		return await this._repository.createQuestion(question);
	}

	public async findAllQuestions() {
		return await this._repository.selectAllQuestions();
	}

	public async findQuestion(id: QuestionEntity['id']) {
		// return await this._repository.selectSafeQuestionById(id);
	}

	// public async changeQuestion(id: QuestionEntity['id'], updateQuestionDto: UpdateQuestionDto) {
	//   // return await this._repository.updateQuestion(id, updateQuestionDto);
	// }

	public async removeQuestion(id: QuestionEntity['id']) {
		// return await this._repository.deleteQuestionById(id);
	}
}

import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuestionEntity } from '../entities/question.entity';

@Injectable()
export class QuestionRepository {

	constructor(
		@Inject('QUESTION_REPOSITORY')
		private readonly _repository: Repository<QuestionEntity>,
	) { }

	public async createQuestion(newEntity: QuestionEntity): Promise<QuestionEntity> {
		return await this._repository.save(newEntity);
	}

	public async selectAllQuestions(): Promise<QuestionEntity[]> {
		return await this._repository
			.createQueryBuilder('questions')
			.getMany();
	}

	public async selectSafeQuestionById(id: QuestionEntity['id']): Promise<QuestionEntity> {
		return await this._repository
			.createQueryBuilder('questions')
			.where('questions.id = :id', { id: id })
			.getOne();
	}

	// public async updateQuestion(QuestionId: QuestionEntity['id'], updateQuestionDto: UpdateQuestionDto): Promise<QuestionEntity> {
	// 	return await this.questionsRepository.save({
	// 		id: QuestionId,
	// 		...updateQuestionDto
	// 	});
	// }

	public async deleteQuestionById(id: QuestionEntity['id']) {
		return await this._repository.delete(id);
	}

}

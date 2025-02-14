import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuestionEntity } from '../entities/question.entity';
import { QuestionUniqueDto } from '../dto/question-uniques.dto';
import { QuestionSearchDto } from '../dto/question-search.dto';

@Injectable()
export class QuestionRepository {

	constructor(
		@Inject('QUESTION_REPOSITORY')
		private readonly _repository: Repository<QuestionEntity>,
	) { }

	public async createQuestion(newEntity: QuestionEntity): Promise<QuestionEntity> {
		return await this._repository.save(newEntity);
	}

	public async selectManyQuestions(search: QuestionSearchDto): Promise<QuestionEntity[]> {
		const query = this._repository
			.createQueryBuilder('questions');

		if (search.id) {
			query.where('questions.id = :id', { id: search.id })
		}
		if (search.code) {
			query.andWhere(`questions.code LIKE :code`, { code: `%${search.code}%` })
		}
		if (search.title) {
			query.andWhere(`questions.title LIKE :title`, { title: `%${search.title}%` })
		}
		if (search.subject) {
			query.andWhere(`questions.subject LIKE :subject`, { subject: `%${search.subject}%` })
		}

		return await query.getMany();
	}

	public async selectSafeQuestionById(uniques: QuestionUniqueDto): Promise<QuestionEntity> {
		return await this._repository
			.createQueryBuilder('questions')
			.where('questions.id = :id', { id: uniques.id })
			.orWhere('questions.code = :code', { code: uniques.code })
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

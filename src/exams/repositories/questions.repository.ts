import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuestionEntity } from '../entities/question.entity';
import { QuestionUniqueDto } from '../dto/question-unique.dto';
import { QuestionSearchDto } from '../dto/question-search.dto';
import { QuestionSelectDto } from '../dto/question-select.dto';
import { QuestionIncludeDto } from '../dto/question-include.dto';

@Injectable()
export class QuestionRepository {

	constructor(
		@Inject('QUESTION_REPOSITORY')
		private readonly _repository: Repository<QuestionEntity>,
	) { }

	public async createQuestion(newEntity: QuestionEntity): Promise<QuestionEntity> {
		return await this._repository.save(newEntity);
	}

	public async selectManyQuestions(search: QuestionSearchDto, include?: QuestionIncludeDto): Promise<QuestionEntity[]> {
		const query = this._repository.createQueryBuilder('questions');

		if (search.id)
			query.where('questions.id = :id', { id: search.id })
		if (search.code)
			query.andWhere(`questions.code LIKE :code`, { code: `%${search.code}%` })
		if (search.typeCode)
			query.andWhere(`questions.type_code IN (:...typeCode)`, { typeCode: search.typeCode })
		
		if (search.title)
			query.andWhere(`questions.title LIKE :title`, { title: `%${search.title}%` })
		if (search.subject)
			query.andWhere(`questions.subject LIKE :subject`, { subject: `%${search.subject}%` })

		if (include) {
			if (include.alternatives) {
				query.leftJoinAndSelect('questions.alternatives', 'alternatives')
				query.orderBy(`alternatives.order`, 'ASC');
			}
			if (include.exams)
				query.leftJoinAndSelect('questions.exams', 'exams')
		}
		
		return await query.getMany();
	}

	public async selectAllQuestionWithSelect(select: QuestionSelectDto): Promise<QuestionEntity[]> {
		const query = this._repository.createQueryBuilder('questions');
		const selectFields: string[] = [];

		selectFields.push('questions.id');

		if (select.code)
			selectFields.push('questions.code');
		if (select.typeCode)
			selectFields.push('questions.type_code');
		if (select.title)
			selectFields.push('questions.title');
		if (select.subject)
			selectFields.push('questions.subject');
		if (select.description)
			selectFields.push('questions.description');
		if (select.discursiveAnswer)
			selectFields.push('questions.discursiveAnswer');
		if (select.isValidated)
			selectFields.push('questions.isValidated');
		if (select.createdAt)
			selectFields.push('questions.createdAt');

		query.select(selectFields);
		return await query.getMany();
	}

	public async selectSafeQuestionByUnique(uniques: QuestionUniqueDto, include?: QuestionIncludeDto): Promise<QuestionEntity> {
		const query = this._repository.createQueryBuilder('questions')

		if (uniques.id)
			query.where(`questions.id LIKE :id`, { id: `%${uniques.id}%` })

		if (uniques.code)
			query.orWhere(`questions.code LIKE :code`, { code: `%${uniques.code}%` })

		if (include) {
			if (include.alternatives) {
				query.leftJoinAndSelect('questions.alternatives', 'alternatives')
				query.orderBy(`alternatives.order`, 'ASC');
			}
			if (include.exams)
				query.leftJoinAndSelect('questions.exams', 'exams')
		}

		return await query.getOne();
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

// import { source } from './database';
import { Inject, Injectable } from '@nestjs/common';
import { ExamEntity } from '../entities/exam.entity';
import { CreateExamDto } from '../dto/exam-create.dto';
import { Repository } from 'typeorm';
import { UpdateExamDto } from '../dto/update-exam.dto';

@Injectable()
export class ExamRepository {

	constructor(
		@Inject('EXAME_REPOSITORY')
		private readonly examsRepository: Repository<ExamEntity>,
	) { }

	public async createExam(newEntity: CreateExamDto): Promise<ExamEntity> {
		return await this.examsRepository.save(newEntity);
	}

	public async selectAllExams(): Promise<ExamEntity[]> {
		return await this.examsRepository.find();
	}

	public async selectSafeExamById(ExamId: ExamEntity['id']): Promise<ExamEntity> {
		return await this.examsRepository.findOne({
			where: {
				id: ExamId
			}
		});
	}

	public async updateExam(ExamId: ExamEntity['id'], updateExamDto: UpdateExamDto): Promise<ExamEntity> {
		return await this.examsRepository.save({
			id: ExamId,
			...updateExamDto
		});
	}

	public async deleteExamById(ExamId: ExamEntity['id']) {
		return await this.examsRepository.delete(ExamId);
	}

}

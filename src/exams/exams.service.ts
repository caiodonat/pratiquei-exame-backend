import { Inject, Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamEntity } from './entities/exam.entity';
import { ExamRepository } from './exams.repository';

@Injectable()
export class ExamsService {

	constructor(
		private readonly examsRepository: ExamRepository,
	) { }

	public async newExam(createExamDto: CreateExamDto) {
		return await this.examsRepository.createExam(createExamDto);
	}

	public async findAllExams() {
		return await this.examsRepository.selectAllExams();
	}

	public async findExam(id: ExamEntity['id']) {
		return await this.examsRepository.selectSafeExamById(id);
	}

	public async changeExam(id: ExamEntity['id'], updateExamDto: UpdateExamDto) {
		return await this.examsRepository.updateExam(id, updateExamDto);
	}

	public async removeExam(id: ExamEntity['id']) {
		return await this.examsRepository.deleteExamById(id);
	}
}

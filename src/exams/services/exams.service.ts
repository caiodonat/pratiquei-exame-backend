import { Inject, Injectable } from '@nestjs/common';
import { CreateExamDto } from '../dto/exam-create.dto';
import { UpdateExamDto } from '../dto/update-exam.dto';
import { ExamEntity } from '../entities/exam.entity';
import { ExamRepository } from '../repositories/exams.repository';
import { QuestionsService } from './questions.service';
import { QuestionSearchDto } from '../dto/question-search.dto';
import { EXAM_STATUS } from '../enums/examStatus.enum';
import { ExamGenerateParams } from '../dto/exam-generation.dto';

@Injectable()
export class ExamsService {

	constructor(
		private readonly _repository: ExamRepository,
		private readonly _serveceQuestion: QuestionsService,
	) { }

	public async newExam(createExamDto: CreateExamDto) {
		return await this._repository.createExam(createExamDto);
	}

	public async findAllExams() {
		return await this._repository.selectAllExams();
	}

	public async findExam(id: ExamEntity['id']) {
		return await this._repository.selectSafeExamById(id);
	}

	public async changeExam(id: ExamEntity['id'], updateExamDto: UpdateExamDto) {
		return await this._repository.updateExam(id, updateExamDto);
	}

	public async removeExam(id: ExamEntity['id']) {
		return await this._repository.deleteExamById(id);
	}

	public async generateExamRandom(params: ExamGenerateParams) {
		const questionsCount = params.questionCount;

		const questionSearch = new QuestionSearchDto();
		if(params.questionTypes)
			questionSearch.typeCode = params.questionTypes;

		const questions = await this._serveceQuestion.searchQuestions(questionSearch, {
			alternatives: true
		});

		const exam = new ExamEntity();
		exam.questions = questions.slice(0, questionsCount);
		exam.status = EXAM_STATUS.TEMP;
		exam.title = params.title;

		return exam;
	}
}

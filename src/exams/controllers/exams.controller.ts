import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// 
import { ExamsService } from '../services/exams.service';
import { CreateExamDto } from '../dto/exam-create.dto';
import { UpdateExamDto } from '../dto/update-exam.dto';
import { QuestionSearchDto } from '../dto/question-search.dto';
import { ExamGenerateParams } from '../dto/exam-generation.dto';

@Controller('exams')
@ApiTags('Exams')
export class ExamsController {
	constructor(
		private readonly _service: ExamsService
	) { }

	/**
	 * @todo Apenas ADMIN. 
	 */
	// @Roles(['ADMIN'])
	@Post('/')
	public async postExam(
		@Body() createExamDto: CreateExamDto
	) {
		return await this._service.newExam(createExamDto);
	}

	@Get('/all')
	public async getExamsAll() {
		return this._service.findAllExams();
	}

	@Get('/random')
	public async getExamRandom(
		@Query() params: ExamGenerateParams
	) {
		return await this._service.generateExamRandom(params);
	}

	/**
	 * @todo
	 * - change to `getExamsUnique`
	 */
	@Get('/:id')
	public async getExamsId(
		@Param('id') id: string
	) {
		return this._service.findExam(id);
	}

	@Patch('/:id')
	public async patchExams(
		@Param('id') id: string,
		@Body() updateExamDto: UpdateExamDto
	) {
		return this._service.changeExam(id, updateExamDto);
	}

	@Delete('/:id')
	public async deleteExamsId(
		@Param('id') id: string
	) {
		return this._service.removeExam(id);
	}
}

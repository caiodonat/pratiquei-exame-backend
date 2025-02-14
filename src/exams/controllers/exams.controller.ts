import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamsService } from '../exams.service';
import { CreateExamDto } from '../dto/create-exam.dto';
import { UpdateExamDto } from '../dto/update-exam.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('exams')
@ApiTags('Exams')
export class ExamsController {
	constructor(
		private readonly examsService: ExamsService
	) { }

	/**
	 * @todo Apenas ADMIN. 
	 */
	@Post('/')
	public async postExam(
		@Body() createExamDto: CreateExamDto
	) {
		return await this.examsService.newExam(createExamDto);
	}

	@Get('/all')
	public async getExamsAll() {
		return this.examsService.findAllExams();
	}

	@Get('/:id')
	public async getExamsId(
		@Param('id') id: string
	) {
		return this.examsService.findExam(id);
	}

	@Patch('/:id')
	public async patchExams(
		@Param('id') id: string,
		@Body() updateExamDto: UpdateExamDto
	) {
		return this.examsService.changeExam(id, updateExamDto);
	}

	@Delete('/:id')
	public async deleteExamsId(
		@Param('id') id: string
	) {
		return this.examsService.removeExam(id);
	}
}

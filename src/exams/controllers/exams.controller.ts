import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
	@ApiOperation({ summary: `Criar um Exame` })
	public async postExam(
		@Body() createExamDto: CreateExamDto
	) {
		return await this._service.newExam(createExamDto);
	}

	@Get('/all')
	@ApiOperation({ summary: `Obter todos os Exames com dados reduzidos` })
	public async getExamsAll() {
		return this._service.findAllExams();
	}

	@Get('/random')
	@ApiOperation({ summary: `Gerar um Exame aleatório com base em parâmetros` })
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
	@ApiOperation({ summary: `Obter detalhes de um Exame por valor único` })
	public async getExamsId(
		@Param('id') id: string
	) {
		return this._service.findExam(id);
	}

	@Patch('/:id')
	@ApiOperation({ summary: `Atualizar um Exame e suas Questões` })
	public async patchExams(
		@Param('id') id: string,
		@Body() updateExamDto: UpdateExamDto
	) {
		return this._service.changeExam(id, updateExamDto);
	}

	@Delete('/:id')
	@ApiOperation({ summary: `Apagar um Exame` })
	public async deleteExamsId(
		@Param('id') id: string
	) {
		return this._service.removeExam(id);
	}
}

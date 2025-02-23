import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
// import { QuestionsService } from './questions.service';
// import { CreateQuestionDto } from './dto/create-exam.dto';
// import { UpdateQuestionDto } from './dto/update-exam.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuestionsService } from '../services/questions.service';
import { QuestionCreateDto } from '../dto/question-create.dto';
import { QuestionSearchDto } from '../dto/question-search.dto';
import { QuestionSelectDto } from '../dto/question-select.dto';

@Controller('questions')
@ApiTags('Questions')
export class QuestionsController {
	constructor(
		private readonly _service: QuestionsService
	) { }

	/**
	 * @todo Qualquer um pode 'submeter uma **Questão**'.
	 */
	@Post('/')
	public async postQuestion(
		@Body() createQuestionDto: QuestionCreateDto
	) {
		return await this._service.newQuestion(createQuestionDto);
	}

	@Get('/all')
	@ApiOperation({ description: `Listar todas as **Questões** selecionando campos.` })
	public async getAllQuestionsMinimal(
		@Query() select: QuestionSelectDto
	) {
		return await this._service.listAllQuestion(select);
	}


	@Get('/search')
	public async getQuestionsSearch(
		@Query() search: QuestionSearchDto
	) {
		return await this._service.searchQuestions(search);
	}

	@Get('/:id')
	@ApiOperation({ description: `Obter **Questão** por valor único, incluindo racionamentos.` })
	public async getQuestionsId(
		@Param('id') id: string
	) {
		return this._service.findQuestionByUnique({ id });
	}

	@Patch('/:id')
	public async patchQuestions(
		@Param('id') id: string,
		@Body() updateQuestionDto/* : UpdateQuestionDto */
	) {
		// return this._service.changeQuestion(id, updateQuestionDto);
	}

	@Delete('/:id')
	public async deleteQuestionsId(
		@Param('id') id: string
	) {
		// return this._service.removeQuestion(id);
	}
}

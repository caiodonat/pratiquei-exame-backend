import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// 
import { QuestionsService } from '../services/questions.service';
import { QuestionCreateDto } from '../dto/question-create.dto';
import { QuestionSearchDto } from '../dto/question-search.dto';
import { QuestionSelectDto } from '../dto/question-select.dto';
import { QuestionUniqueDto } from '../dto/question-unique.dto';
import { QuestionIncludeDto } from '../dto/question-include.dto';

@Controller('questions')
@ApiTags('Questions')
export class QuestionsController {
	constructor(
		private readonly _service: QuestionsService
	) { }

	/**
	 * @todo Qualquer um pode 'submeter uma **Questão**'.
	 */
	@Post('/request')
	@ApiOperation({ summary: `Submeter nova Questão` })
	public async postQuestionRequest(
		@Body() createQuestionDto: QuestionCreateDto
	) {
		return await this._service.newQuestion(createQuestionDto);
	}

	@Get('/all')
	@ApiOperation({ summary: `Listar todas as Questões selecionando propriedades` })
	public async getAllQuestionsMinimal(
		@Query() select: QuestionSelectDto
	) {
		return await this._service.listAllQuestion(select);
	}


	@Get('/search')
	@ApiOperation({ summary: `Pesquisar Questões utilizando filtros` })
	public async getQuestionsSearch(
		@Query() search: QuestionSearchDto
	) {
		return await this._service.searchQuestions(search);
	}

	@Get('/unique')
	@ApiOperation({ summary: `Obter Questão por valor único e incluindo racionamentos` })
	public async getQuestionsId(
		@Query() unique: QuestionUniqueDto,
		@Query() include: QuestionIncludeDto
	) {
		return this._service.findQuestionByUnique(unique, include);
	}

	@Patch('/:id')
	@ApiOperation({ summary: `Atualizar dados de uma Questão e suas alternativas` })
	public async patchQuestions(
		@Param('id') id: string,
		@Body() updateQuestionDto/* : UpdateQuestionDto */
	) {
		// return this._service.changeQuestion(id, updateQuestionDto);
	}

	@Delete('/:id')
	@ApiOperation({ summary: `Apagar uma Questão por valor único` })
	public async deleteQuestionsId(
		@Param('id') id: string
	) {
		// return this._service.removeQuestion(id);
	}
}

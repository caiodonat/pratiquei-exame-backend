import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
// import { QuestionsService } from './questions.service';
// import { CreateQuestionDto } from './dto/create-exam.dto';
// import { UpdateQuestionDto } from './dto/update-exam.dto';
import { ApiTags } from '@nestjs/swagger';
import { QuestionsService } from '../services/questions.service';
import { QuestionCreateDto } from '../dto/question-create.dto';
import { QuestionSearchDto } from '../dto/question-search.dto';

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

	@Get('/search')
	public async getQuestionsSearch(
		@Query() search: QuestionSearchDto
	) {
		return await this._service.searchQuestions(search);
	}

	@Get('/:id')
	public async getQuestionsId(
		@Param('id') id: string
	) {
		// return this._service.findQuestion(id);
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

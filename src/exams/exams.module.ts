import { Module } from '@nestjs/common';
import { Repository } from 'typeorm';
// 
import { ExamsService } from './services/exams.service';
import { ExamsController } from './controllers/exams.controller';
import { DatabaseModule } from 'src/database/database.module';
import { examsProviders } from './exams.provider';
import { ExamRepository } from './repositories/exams.repository';
import { QuestionsController } from './controllers/question.controller';
import { QuestionsService } from './services/questions.service';
import { QuestionRepository } from './repositories/questions.repository';

@Module({
	imports: [DatabaseModule, Repository],
	controllers: [ExamsController, QuestionsController],
	providers: [
		...examsProviders,
		ExamsService,
		ExamRepository,

		QuestionsService,
		QuestionRepository,
	],
})
export class ExamsModule { }

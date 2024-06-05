import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Repository } from 'typeorm';
import { examsProviders } from './exams.provider';
import { ExamRepository } from './exams.repository';

@Module({
  imports: [DatabaseModule, Repository],
  controllers: [ExamsController],
  providers: [
    ...examsProviders,
    ExamsService,
    ExamRepository
  ],
})
export class ExamsModule { }

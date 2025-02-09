import { DataSource } from 'typeorm';
import { ExamEntity } from './entities/exam.entity';
import { QuestionEntity } from './entities/question.entity';

export const examsProviders = [
  {
    provide: 'EXAME_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ExamEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'QUESTION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(QuestionEntity),
    inject: ['DATA_SOURCE'],
  },
];
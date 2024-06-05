import { DataSource } from 'typeorm';
import { ExamEntity } from './entities/exam.entity';

export const examsProviders = [
  {
    provide: 'EXAME_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ExamEntity),
    inject: ['DATA_SOURCE'],
  },
];
import { DataSource } from 'typeorm';
// 
import { CourseEntity } from './entities/course.entity';

export const courseProviders = [
  {
    provide: 'COURSES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CourseEntity),
    inject: ['DATA_SOURCE'],
  }
];
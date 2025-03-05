import { DataSource } from 'typeorm';
// 
import { CourseEntity } from './entities/course.entity';
import { CourseTopicEntity } from './entities/topics.entity';

export const courseProviders = [
  {
    provide: 'COURSES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CourseEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'COURSES_TOPICS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CourseTopicEntity),
    inject: ['DATA_SOURCE'],
  }
];
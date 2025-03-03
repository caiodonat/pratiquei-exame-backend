import { Module } from '@nestjs/common';
import { Repository } from 'typeorm';
// 
import { DatabaseModule } from '@database/database.module';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { courseProviders } from './courses.provider';
import { CoursesRepository } from './courses.repository';

@Module({
  imports: [DatabaseModule, Repository],
  controllers: [CoursesController],
  providers: [
    ...courseProviders,
    CoursesService,
    CoursesRepository
  ],
})
export class CoursesModule { }

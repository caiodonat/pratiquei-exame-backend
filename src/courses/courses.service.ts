import { Injectable, UnprocessableEntityException } from '@nestjs/common';
// 
import { CoursesRepository } from './courses.repository';
import { CourseEntity } from './entities/course.entity';
import { CourseTopicEntity } from './entities/topics.entity';
import { CourseSelectDto } from './dto/course-select.dto';
import { CourseCreateNestedTopicsDto } from './dto/courseTopic-create.dto';
import { CourseIncludeDto } from './dto/course-include.dto';
import { CourseSearchDto } from './dto/course-search.dto';


@Injectable()
export class CoursesService {

  constructor(
    private readonly _repository: CoursesRepository,
  ) { }

  public async newCourseWithTopics(dto: CourseCreateNestedTopicsDto): Promise<CourseEntity> {
    const course = dto.toEntity();

    course.topics = this.setValidatingTopics(dto);

    const courseRelated = await this._repository.selectSafeCourseByUnique(course);
    if (courseRelated)
      throw new UnprocessableEntityException(`Dados do únicos do "Curso" já em uso`);

    // return course;
    return await this._repository.upsertCourse(course);
  }

  public async listAllQuestion(select: CourseSelectDto) {
    return await this._repository.selectAllCourseWithSelect(select);
  }

  public async searchQuestion(search: CourseSearchDto, include?: CourseIncludeDto): Promise<CourseEntity[]> {
    return await this._repository.selectManyCourses(search, include);
  }

  private setValidatingTopics(dto: CourseCreateNestedTopicsDto): CourseTopicEntity[] {
    const topics: CourseTopicEntity[] = [];

    if (!dto.topics || dto.topics.length <= 0)
      throw new UnprocessableEntityException(`Não é possível criar um "Curso" sem 'tópicos'`);

    dto.topics = dto.topics.sort((a, b) => a.order - b.order);

    for (let i = 0; i < dto.topics.length; i++) {
      const newTopic = new CourseTopicEntity();
      newTopic.id = dto.topics[i].id;
      newTopic.name = dto.topics[i].name;
      newTopic.order = i + 1;
      newTopic.tag = `${dto.code}-t${newTopic.order}`;
      newTopic.courseId = dto.id;


      topics.push(newTopic);
    }

    return topics;
  }
}
// 
import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
//
import { CourseTopicEntity } from "@courses/entities/topics.entity";
import { CourseTopicUniqueDto } from "@courses/dto/courseTopic-unique.dto";

@Injectable()
export class CoursesRepository {

  constructor(
    @Inject('COURSES_TOPICS_REPOSITORY')
    private readonly _repository: Repository<CourseTopicEntity>,
  ) { }

  public async upsertCourse(newEntity: CourseTopicEntity): Promise<CourseTopicEntity> {
    return await this._repository.save(newEntity);
  }

  public async selectAllCourseWithSelect(select: any): Promise<CourseTopicEntity[]> {
    const query = this._repository.createQueryBuilder('courses_topics');
    const selectFields: string[] = [];

    selectFields.push('courses_topics.id');

    if (select.tag)
      selectFields.push('courses_topics.tag');
    if (select.name)
      selectFields.push('courses_topics.name');

    query.select(selectFields);
    return await query.getMany();
  }

  public async selectCourseTopicByUnique(unique: CourseTopicUniqueDto) {
    const query = this._repository.createQueryBuilder('courses_topics');
    const selectFields: string[] = [];

    selectFields.push('courses_topics.id');

    if (unique.id)
      query.where('questions.id = :id', { id: unique.id })
    if (unique.tag)
      query.andWhere(`questions.tag LIKE :tag`, { tag: `%${unique.tag}%` })
    // query.select(selectFields);
    
    return await query.getOne();
  }

}

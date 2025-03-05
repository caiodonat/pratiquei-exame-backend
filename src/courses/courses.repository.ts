import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
// 
import { CourseEntity } from "./entities/course.entity";
import { CourseSelectDto } from "./dto/course-select.dto";
import { CourseUniqueDto } from "./dto/course-unique.dto";
import { CourseSearchDto } from "./dto/course-search.dto";
import { CourseIncludeDto } from "./dto/course-include.dto";

@Injectable()
export class CoursesRepository {

  constructor(
    @Inject('COURSES_REPOSITORY')
    private readonly _repository: Repository<CourseEntity>,
  ) { }


  public async upsertCourse(newEntity: CourseEntity): Promise<CourseEntity> {
    return await this._repository.save(newEntity);
  }

  public async selectAllCourseWithSelect(select: CourseSelectDto): Promise<CourseEntity[]> {
    const query = this._repository.createQueryBuilder('courses');
    const selectFields: string[] = [];

    selectFields.push('courses.id');

    if (select.code)
      selectFields.push('courses.code');
    if (select.name)
      selectFields.push('courses.name');

    query.select(selectFields);
    return await query.getMany();
  }

  public async selectSafeCourseByUnique(uniques: CourseUniqueDto, include?: any): Promise<CourseEntity> {
    const query = this._repository.createQueryBuilder('courses')

    if (uniques.id)
      query.where(`courses.id LIKE :id`, { id: `%${uniques.id}%` })

    if (uniques.code)
      query.orWhere(`courses.code LIKE :code`, { code: `%${uniques.code}%` })

    if (include) {
      if (include.topics) {
        query.leftJoinAndSelect('courses.topics', 'topics')
        query.orderBy(`topics.order`, 'ASC');
      }
      if (include.exams)
        query.leftJoinAndSelect('courses.exams', 'exams')
    }

    return await query.getOne();
  }

  public async selectManyCourses(search: CourseSearchDto, include?: CourseIncludeDto): Promise<CourseEntity[]> {
    const query = this._repository.createQueryBuilder('courses');

    if (search.id)
      query.where('courses.id = :id', { id: search.id })
    if (search.code)
      query.andWhere(`courses.code LIKE :code`, { code: `%${search.code}%` })
    if (search.name)
      query.andWhere(`courses.name LIKE :name`, { name: `%${search.name}%` })
    if (search.topic) {
      query.leftJoinAndSelect("courses.topics", "topics")
        .orderBy(`topics.order`, 'ASC');

      query.andWhere("topics.name LIKE :topic", { topic: `%${search.topic}%` });
    }

    if (include) {
      if (include.topics && !search.topic) {
        query.leftJoinAndSelect('courses.topics', 'topics')
          .orderBy(`topics.order`, 'ASC');
      }
    }

    return await query.getMany();
  }
}

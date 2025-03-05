import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
// 
import { CourseEntity } from "./entities/course.entity";
import { CourseSelectDto } from "./dto/courses-select.dto";
import { CourseUniqueDto } from "./dto/course-unique.dto";

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
}

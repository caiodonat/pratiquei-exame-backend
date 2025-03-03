import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
// 
import { CourseEntity } from "./entities/course.entity";
import { CourseSelectDto } from "./dto/courses-select.dto";

@Injectable()
export class CoursesRepository {

  constructor(
    @Inject('COURSES_REPOSITORY')
    private readonly _repository: Repository<CourseEntity>,
  ) { }

  public async selectAllQuestionWithSelect(select: CourseSelectDto): Promise<CourseEntity[]> {
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


}

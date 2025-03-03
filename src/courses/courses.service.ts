import { Injectable } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CourseSelectDto } from './dto/courses-select.dto';

@Injectable()
export class CoursesService {

  constructor(
    private readonly _repository: CoursesRepository,
  ) { }

    public async listAllQuestion(select: CourseSelectDto) {
      return await this._repository.selectAllQuestionWithSelect(select);
    }
}
// 
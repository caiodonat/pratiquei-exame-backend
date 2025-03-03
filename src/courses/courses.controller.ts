import { Controller, Get, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { ApiTags } from '@nestjs/swagger';
import { CourseSelectDto } from './dto/courses-select.dto';

@Controller('courses')
@ApiTags('Courses')
export class CoursesController {
  constructor(private readonly _service: CoursesService) {}

    @Get('/all')
    // @ApiOperation({ description: `Listar todas as **Questões** selecionando campos.` })
    public async getAllCoursesMinimal(
      @Query() select: CourseSelectDto
    ) {
      return await this._service.listAllQuestion(select);
    }
}

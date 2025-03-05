import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
// 
import { CourseEntity } from './entities/course.entity';
import { CoursesService } from './courses.service';
import { CourseSelectDto } from './dto/courses-select.dto';
import { CourseCreateNestedTopicsDto } from './dto/coursesTopics-create.dto';


@Controller('courses')
@ApiTags('Courses')
export class CoursesController {
  constructor(private readonly _service: CoursesService) { }


  @Post('/full')
  // @Roles(['ADMIN'])
  @ApiCreatedResponse({ type: CourseEntity })
  public async postCourses(
    @Body() dto: CourseCreateNestedTopicsDto
  ) {
    return await this._service.newCourseWithTopics(dto);
  }

  @Get('/all')
  // @ApiOperation({ description: `Listar todas as **Questões** selecionando campos.` })
  public async getAllCoursesMinimal(
    @Query() select: CourseSelectDto
  ) {
    return await this._service.listAllQuestion(select);
  }
}

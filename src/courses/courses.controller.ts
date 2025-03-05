import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
// 
import { CourseEntity } from './entities/course.entity';
import { CoursesService } from './courses.service';
import { CourseSelectDto } from './dto/course-select.dto';
import { CourseCreateNestedTopicsDto } from './dto/courseTopic-create.dto';
import { CourseSearchDto } from './dto/course-search.dto';
import { CourseIncludeDto } from './dto/course-include.dto';


@Controller('courses')
@ApiTags('Courses')
export class CoursesController {
  constructor(
    private readonly _service: CoursesService
  ) { }

  @Post('/full')
  // @Roles(['ADMIN'])
  @ApiCreatedResponse({ type: CourseEntity })
  public async postCourses(
    @Body() dto: CourseCreateNestedTopicsDto
  ) {
    return await this._service.newCourseWithTopics(dto);
  }

  @Get('/all')
  @ApiOkResponse({ type: CourseEntity, isArray: true })
  // @ApiOperation({ description: `Listar todas as **Questões** selecionando campos.` })
  public async getAllCoursesMinimal(
    @Query() select: CourseSelectDto
  ) {
    return await this._service.listAllQuestion(select);
  }

  @Get('search')
  @ApiOkResponse({ type: CourseEntity, isArray: true })
  public async getCoursesSearch(
    @Query() search: CourseSearchDto,
    @Query() include?: CourseIncludeDto
  ) {
    return await this._service.searchQuestion(search, include)
  }
}

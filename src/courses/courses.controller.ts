import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: `Cadastrar um Curso e seus Tópicos` })
  @ApiCreatedResponse({ type: CourseEntity })
  public async postCourses(
    @Body() dto: CourseCreateNestedTopicsDto
  ) {
    return await this._service.newCourseWithTopics(dto);
  }

  @Get('/all')
	@ApiOperation({ summary: `Listar todos os Cursos selecionando propriedades` })
  @ApiOkResponse({ type: CourseEntity, isArray: true })
  public async getAllCoursesMinimal(
    @Query() select: CourseSelectDto
  ) {
    return await this._service.listAllQuestion(select);
  }

  @Get('search')
	@ApiOperation({ summary: `Pesquisar Cursos utilizando filtros` })
  @ApiOkResponse({ type: CourseEntity, isArray: true })
  public async getCoursesSearch(
    @Query() search: CourseSearchDto,
    @Query() include?: CourseIncludeDto
  ) {
    return await this._service.searchQuestion(search, include)
  }
}

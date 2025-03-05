import { ApiHideProperty, ApiProperty, PickType } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { Transform, Type } from "class-transformer";
// 
import { CourseEntity } from "../entities/course.entity";
import { CourseTopicEntity } from "@courses/entities/topics.entity";
import { ValidateNested } from "class-validator";
// import { AlternativeCreateDto } from "./alternative-create.dto";

export class TopicsCreateNestedCourseDto
// extends PickType(CourseTopicEntity, ['tag', 'name', 'order'])
{

  @ApiHideProperty()
  public id: CourseTopicEntity['id'] = randomUUID();

  @ApiHideProperty()
  public tag?: string | undefined;

  @ApiProperty({ type: String, })
  public name: string;

  @ApiHideProperty()
  public order: number;

}

export class CourseCreateNestedTopicsDto
// extends OmitType(CourseEntity, ['id', 'code', 'isValidated', 'createdAt', 'alternatives']) 
{

  @ApiHideProperty()
  private _id: CourseEntity['id'] = randomUUID();

  @ApiProperty({ name: 'code', type: String })
  private _code: string = this.id;


  @ApiProperty({ type: String })
  public name: string;


  @ApiProperty({ type: TopicsCreateNestedCourseDto, isArray: true })
  @Type(() => TopicsCreateNestedCourseDto)
  public topics: TopicsCreateNestedCourseDto[];


  public get id(): CourseEntity['id'] {
    return this._id;
  }
  public set id(value: CourseEntity['id']) {
    this._id = value;

  }

  @Transform(({ value }) => value.toLowerCase())
  @Transform(({ value }) => value.replace(" ", "-"))
  public get code(): string {
    return this._code;
  }
  public set code(value: string) {
    if (value || value != "") {
      this._code = value;
    } else {
      this._code = this.id;
    }
  }

  public toEntity() {
    const entity = new CourseEntity();
    entity.id = this.id;
    entity.code = this.code;
    entity.name = this.name;

    return entity;
  }
}

// export type CourseCreateDtoType = Pick<CourseCreateDto,
//   'code' | 'typeCode' | 'title' | 'subject' | 'description' | 'discursiveAnswer'
// >;

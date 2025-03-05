import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
// 
import { CourseEntity } from "../entities/course.entity";

export class CourseSearchDto
  extends PickType(
    PartialType(CourseEntity), ['id', 'code', 'name']
  )
{

  @ApiProperty({ type: String, required: false })
  public topic?: string | undefined;
}

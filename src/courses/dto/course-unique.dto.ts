import { PartialType, PickType } from "@nestjs/swagger";
// 
import { CourseEntity } from "@courses/entities/course.entity";

export class CourseUniqueDto
  extends PickType(PartialType(CourseEntity), ['id', 'code']) {
}

import { PartialType, PickType } from "@nestjs/swagger";
import {CourseTopicEntity } from "../entities/topics.entity";

export class CourseTopicUniqueDto
  extends PickType(PartialType(CourseTopicEntity), ['id', 'tag']) {
}

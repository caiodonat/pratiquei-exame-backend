import { PartialType, PickType } from "@nestjs/swagger";
import { QuestionEntity } from "../entities/question.entity";

export class QuestionUniqueDto
	extends PickType(PartialType(QuestionEntity), ['id', 'code']) {
}

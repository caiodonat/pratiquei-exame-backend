import { PartialType, PickType } from "@nestjs/swagger";
import { QuestionEntity } from "../entities/question.entity";

export class QuestionSearchDto
	extends PickType(
		PartialType(QuestionEntity), ['id', 'code', 'title', 'subject']
	) {
}

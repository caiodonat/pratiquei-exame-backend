import { ApiProperty } from "@nestjs/swagger";
import { QuestionEntity } from "../entities/question.entity";
import { QUESTION_TYPE } from "../enums/questionType.enum";

export class ExamGenerateParams {

	@ApiProperty({ type: Number, required: false, default: 10 })
	public questionCount: number = 10;

	@ApiProperty({ type: String, required: false })
	public title: string | undefined;

	@ApiProperty({ enum: QUESTION_TYPE, isArray: true, required: false })
	public questionTypes: QUESTION_TYPE[];

}

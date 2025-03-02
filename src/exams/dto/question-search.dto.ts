import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { QuestionEntity } from "../entities/question.entity";
import { QUESTION_TYPE } from "../enums/questionType.enum";
import { IsEnum } from "class-validator";

export class QuestionSearchDto
	extends PickType(
		PartialType(QuestionEntity), ['id', 'code', 'title', 'subject']
	) {

	@ApiProperty({ name: 'typeCode', enum: QUESTION_TYPE, isArray: true, required: false })
	@IsEnum(QUESTION_TYPE, { message: '"Tipo da Questão" invalida' })
	private _typeCode: QUESTION_TYPE[] | undefined;

	public get typeCode(): QUESTION_TYPE[] | undefined {
		return this._typeCode;
	}
	public set typeCode(value: QUESTION_TYPE[] | undefined) {
		if (typeof value === 'string') {
			this._typeCode = [QUESTION_TYPE[value]];
		} else {
			this._typeCode = value;
		}
	}
}

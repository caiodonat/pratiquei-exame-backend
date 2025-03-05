import { ApiHideProperty, ApiProperty, OmitType } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { QuestionEntity } from "../entities/question.entity";
import { Transform } from "class-transformer";
import { AlternativeCreateDto } from "./alternative-create.dto";


export class QuestionCreateDto
	extends OmitType(QuestionEntity, ['id', 'code', 'isValidated', 'createdAt', 'alternatives']) {

	@ApiHideProperty()
	private _id: QuestionEntity['id'] = randomUUID();


	@ApiProperty({ name: 'code', type: String })
	private _code: string = this.id;


	@ApiHideProperty()
	public isValidated: boolean = false;

	@ApiHideProperty()
	public createdAt: Date = new Date();

	@ApiProperty({ type: AlternativeCreateDto, isArray: true })
	public alternatives: AlternativeCreateDto[];


	public get id(): QuestionEntity['id'] {
		return this._id;
	}
	public set id(value: QuestionEntity['id']) {
		if (!value) {
			this._id = randomUUID();
		} else {
			this._id = value;
		}
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
		return new QuestionEntity(this);
	}
}

export type QuestionCreateDtoType = Pick<QuestionCreateDto,
	'code' | 'typeCode' | 'title' | 'subject' | 'description' | 'discursiveAnswer'
>;

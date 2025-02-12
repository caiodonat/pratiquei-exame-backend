import { ApiHideProperty, ApiProperty, OmitType } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { QuestionEntity } from "../entities/question.entity";
import { Transform } from "class-transformer";


export class QuestionCreateDto
	extends OmitType(QuestionEntity, ['id', 'code', 'isValidated', 'createdAt']) {

	@ApiHideProperty()
	private _id: QuestionEntity['id'];


	@Transform(({ value }) => value.toLowerCase())
	@Transform(({ value }) => value.replace(" ", "-"))
	private _code: QuestionEntity['code'];


	@ApiHideProperty()
	public isValidated: boolean = false;

	@ApiHideProperty()
	public createdAt: Date = new Date();


	public constructor(dto: QuestionCreateDtoType | any) {
		super();
		// console.debug(dto);

		if (dto) {
			// this.id = randomUUID();

			this.id = 'jghisuvdgbfuysgf';
			this.code = dto.code;

			this.typeCode = dto.typeCode;
			
			this.title = dto.title;
			this.subject = dto.subject;
			this.description = dto.description;
			this.discursiveAnswer = dto.discursiveAnswer;
		}
	}


	public get id(): QuestionEntity['id'] {
		return this._id;
	}
	public set id(value: QuestionEntity['id']) {
		console.debug('set id')
		if (!value) {
			this._id = randomUUID();
		} else {
			this._id = value;
		}
	}

	public get code(): string {
		return this._code;
	}
	public set code(value: string) {
		console.debug('set code')
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

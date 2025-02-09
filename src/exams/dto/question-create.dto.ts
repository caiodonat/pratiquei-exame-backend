import { ApiHideProperty, ApiProperty, OmitType } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { QuestionEntity } from "../entities/question.entity";


export class QuestionCreateDto
	extends OmitType(QuestionEntity, ['id', 'isValidated', 'createdAt']) {

	@ApiHideProperty()
	public id: QuestionEntity['id'];

	@ApiHideProperty()
	public isValidated: boolean = false;

	@ApiHideProperty()
	public createdAt: Date = new Date();


	constructor(dto: QuestionCreateDtoType | any | undefined) {
		super();
		this.id = randomUUID();

		if (dto) {
			if (dto['id']) {
				this.id = dto['id'];
			}

			if (dto.code) {
				this.code = dto.code;
			} else {				
				this.code = this.id;
			}

			this.typeCode = dto.typeCode;
			this.title = dto.title;
			this.subject = dto.subject;
			this.description = dto.description;
			this.discursiveAnswer = dto.discursiveAnswer;
		}
	}

	public toEntity() {
		return new QuestionEntity(this);
	}
}

export type QuestionCreateDtoType = Pick<QuestionCreateDto,
	'code' | 'typeCode' | 'title' | 'subject' | 'description' | 'discursiveAnswer'
>;

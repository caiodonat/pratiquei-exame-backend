import { ApiHideProperty, OmitType } from "@nestjs/swagger";
import { randomUUID } from "crypto";
// 
import { AlternativeEntity } from '../entities/alternative.entity';


export class AlternativeCreateDto
	extends OmitType(AlternativeEntity, ['id', 'questionId', 'question']) {

	@ApiHideProperty()
	id: AlternativeEntity['id'] = randomUUID();

	@ApiHideProperty()
	questionId: AlternativeEntity['questionId'];

	public constructor(dto: AlternativeCreateDtoType) {
		super();
		if (dto) {
			this.questionId = dto.questionId;

			this.subject = dto.subject;
			this.order = dto.order;
			this.isCorrect = dto.isCorrect;
			this.feedback = dto.feedback;
		}

	}

	public toEntity() {
		return new AlternativeEntity(this);
	}
}

export type AlternativeCreateDtoType = Pick<AlternativeCreateDto,
	'questionId' | 'subject' | 'order' | 'isCorrect' | 'feedback'
>;

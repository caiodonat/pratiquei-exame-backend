import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { QuestionEntity } from "./question.entity";


@Entity('alternatives')
export class AlternativeEntity {

	@PrimaryGeneratedColumn(`uuid`)
	@ApiProperty({ type: String })
	public id: string;

	@Column({ name: 'question_id' })
	@ApiProperty({ type: String })
	public questionId: string;


	@Column()
	@ApiProperty({ type: String })
	public subject: string;

	@Column({ name: 'is_correct', type: Boolean })
	@ApiProperty({ type: Boolean })
	public isCorrect: Boolean;

	@Column({ type: String })
	@ApiProperty({ type: String })
	public feedback: string;

	@Column({ type: Number })
	@ApiProperty({ type: Number })
	public order: number;


	@ManyToOne(() => QuestionEntity, (question: QuestionEntity) => question.alternatives, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({
		name: 'question_id',
	})
	public question: QuestionEntity;


	public constructor(dto?: Partial<AlternativeEntity>) {
		if (dto) {
			this.id = dto.id;
			this.questionId = dto.questionId;

			this.subject = dto.subject;
			this.order = dto.order;
			this.isCorrect = dto.isCorrect;
			this.feedback = dto.feedback;

			this.question = dto.question;
		}
	}
}

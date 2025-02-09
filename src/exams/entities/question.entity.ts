import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, Length, Min } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { QuestionCreateDto } from "../dto/question-create.dto";
// import { QuestionCreateDtoType } from "../dto/question-create.dto";

@Entity('questions')
export class QuestionEntity {

	@PrimaryGeneratedColumn("uuid")
	@ApiProperty({
		type: String,
		format: 'uuid',
	})
	public id: string;

	@Column({ name: 'type_code' })
	@ApiProperty({ type: String })
	public typeCode: string;


	@Column()
	@ApiProperty({
		type: String,
	})
	@Length(3, 255, {
		message: '"Titulo" deve ser maior que $constraint1'
	})
	public title: string;

	@Column()
	@ApiProperty({
		type: String
	})
	public subject: string;

	@Column()
	@ApiProperty({
		type: String,
	})
	@Length(3, 255, {
		message: '"Descrição" deve ser maior que $constraint1'
	})
	@IsOptional()
	public description: string;

	@Column({ name: 'discursive_answer', nullable: true })
	@ApiProperty({
		type: String,
		required: false
	})
	public discursiveAnswer?: string | undefined;


	@Column()
	@ApiProperty({ type: String })
	public status: string;

	@CreateDateColumn({ name: 'created_at' })
	public createdAt: Date;

	// question_origin_id varchar [ref: > question_origin.id]
	// origin_person_id varchar [ref: > persons.id]

	public constructor(dto?: any) {
		if (dto) {

			this.id = dto.id;
			this.typeCode = dto.typeCode;
			this.title = dto.title;
			this.subject = dto.subject;
			this.description = dto.description;
			this.discursiveAnswer = dto.discursiveAnswer;

			this.status = dto.status;
			this.createdAt = dto.createdAt;
		}
	}
}

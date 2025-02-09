import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, Length, Min, validateSync } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuestionCreateDto } from "../dto/question-create.dto";
import { ExamEntity } from "./exam.entity";
import { QUESTION_TYPE } from "../enums/questionType.enum";
import { instanceToPlain, plainToClass, Transform } from "class-transformer";
// import { QuestionCreateDtoType } from "../dto/question-create.dto";

@Entity('questions')
export class QuestionEntity {

	@PrimaryGeneratedColumn("uuid")
	@ApiProperty({
		type: String,
		format: 'uuid',
	})
	public id: string;

	/**
	 * Only `kebab-case`.
	 */
	@Column({ unique: true, nullable: true })
	@ApiProperty({ type: String })
	@Transform(({ value }) => value.toLowerCase())
	@Transform(({ value }) => value.replace(" ", "-"))
	public code: string;

	@Column({ name: 'type_code' })
	@ApiProperty({ enum: QUESTION_TYPE })
	@IsEnum(QUESTION_TYPE, { message: '"Tipo da Questão" invalida'})
	public typeCode: QUESTION_TYPE;


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


	// @Column()
	// @ApiProperty({
	// 	enum: QUESTION_STATUS
	// })
	// public status: QUESTION_STATUS;
	@Column({ name: 'is_validated' })
	public isValidated: boolean;

	@CreateDateColumn({ name: 'created_at' })
	public createdAt: Date;


	@ManyToMany(() => ExamEntity, (exams: ExamEntity) => exams.description, {
		onDelete: 'SET NULL'
	})
	@JoinTable({ name: '_questions_on_exams' })
	public exams: ExamEntity[];

	// question_origin_id varchar [ref: > question_origin.id]
	// origin_person_id varchar [ref: > persons.id]

	public constructor(dto?: any) {
		if (dto) {

			this.id = dto.id;
			this.code = dto.code;

			this.typeCode = dto.typeCode;
			this.title = dto.title;
			this.subject = dto.subject;
			this.description = dto.description;
			this.discursiveAnswer = dto.discursiveAnswer;

			this.isValidated = dto.isValidated;
			// this.status = dto.status;
			this.createdAt = dto.createdAt;
		}
		// validateSync(this);
	}

	public toJSON() {
		return instanceToPlain(this);
		// return plainToClass(QuestionEntity, this);
	}
}

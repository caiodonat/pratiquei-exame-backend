import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, Length, Min } from "class-validator";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestionEntity } from "./question.entity";

@Entity('exams')
export class ExamEntity {

	@PrimaryGeneratedColumn("uuid")
	@ApiProperty({
		type: String,
		format: 'uuid',
	})
	id: string;

	@Column()
	@ApiProperty({
		type: String,
		example: 'Exame de IPC AOP1'
	})
	@Length(3, 255, {
		message: '"Titulo" deve ser maior que $constraint1'
	})
	title: string;

	@Column()
	@ApiProperty({
		type: String,
		example: 'Conteúdo de Introdução a Programação de Computadores AOP1'
	})
	@Length(3, 255, {
		message: '"Descrição" deve ser maior que $constraint1'
	})
	@IsOptional()
	description: string;

	@ManyToMany(() => QuestionEntity, (simulations: QuestionEntity) => simulations.exams, {
		onDelete: 'SET NULL'
	})
	questions: QuestionEntity[];

}

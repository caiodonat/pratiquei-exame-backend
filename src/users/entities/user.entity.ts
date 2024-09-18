import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Contains, IsAlpha, IsAlphanumeric, IsAscii, IsEmail, Matches, NotContains, Validate } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CustomNameValidator } from '../users.validation';

@Entity('users')
export class UserEntity {

	@PrimaryGeneratedColumn("uuid")
	@ApiProperty({
		type: String,
	})
	@Exclude()
	id: string;

	@Column()
	@ApiProperty({
		type: String
	})
	name: string;

	@Column()
	@ApiProperty({
		type: String,
		description: 'Qualquer texto sera colocado minusculo'
	})
	@IsEmail({}, { message: '"$property" com formato invalido', })
	@Type(() => String)
	@Transform(({ value }) => value.toLowerCase())
	email: string;


	@Column()
	@ApiProperty({
		type: String
	})
	nickname: string;

	// @Expose()
	// public get id(): string {
	// 	return this.id;
	// }
	// public set id(value: string) {
	// 	this.id = value;
	// }
}

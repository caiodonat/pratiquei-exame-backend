import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('users')
export class UserEntity /* extends BaseEntity */ {
	@PrimaryGeneratedColumn("uuid")
	@ApiProperty({
		type: String
	})
	id: string;
	
	@Column()
	@ApiProperty({
		type: String
	})
	name: string;

}

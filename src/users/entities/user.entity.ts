import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('users')
export class UserEntity /* extends BaseEntity */ {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

}

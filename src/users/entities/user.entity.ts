import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('users')
export class UserEntity {

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

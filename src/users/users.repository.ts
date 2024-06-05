// import { source } from './database';
import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {

	constructor(
		@Inject('USER_REPOSITORY')
		private usersRepository: Repository<UserEntity>,
	) { }

	public async createUser(newEntity: CreateUserDto): Promise<UserEntity> {
		return await this.usersRepository.save(newEntity)
	}

	public async selectAllUsers(): Promise<UserEntity[]> {
		return await this.usersRepository.find();
	}

	public async selectSafeUserById(UserId: UserEntity['id']): Promise<UserEntity> {
		return await this.usersRepository.findOne({
			where: {
				id: UserId
			}
		});
	}

	public async updateUser(UserId: UserEntity['id'], updateUserDto: UpdateUserDto): Promise<UserEntity> {
		return await this.usersRepository.save({
			id: UserId,
			...updateUserDto
		});
	}
}

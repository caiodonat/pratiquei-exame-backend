// import { source } from './database';
import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserCreateDto } from './dto/create-user.dto';
import { And, Like, Repository } from 'typeorm';
import { UserUpdateDto } from './dto/update-user.dto';
import { UserSearchDto } from './dto/search-user.dto';

@Injectable()
export class UserRepository {

	constructor(
		@Inject('USER_REPOSITORY')
		private usersRepository: Repository<UserEntity>,
	) { }

	public async createUser(newEntity: UserCreateDto): Promise<UserEntity> {
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

	public async selectManyUsers(queries: UserSearchDto) {
		// let obj = {};
		// const tt = Object.keys(queries).map((key, val) => {
		// 	console.debug(val);

		// 	if (val) {
		// 		obj[key] = val
		// 		// return { queries[key]: val }
		// 	} /* else {
		// 		obj[key] = undefined;
		// 	} */
		// });

		// console.debug(tt)
		// console.debug(obj)

		return await this.usersRepository.find({
			where: {
				id: queries.id ? queries.id : undefined,
				name: queries.name ? Like(`%${queries.name}%`) : undefined,
				email: queries.email ? Like(`%${queries.email}%`) : undefined,
				nickname: queries.nickname ? Like(`%${queries.nickname}%`) : undefined
			}
		});
	}

	public async updateUser(UserId: UserEntity['id'], updateUserDto: UserUpdateDto): Promise<UserEntity> {
		return await this.usersRepository.save({
			id: UserId,
			...updateUserDto
		});
	}
}

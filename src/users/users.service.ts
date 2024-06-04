import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(
    private usersRepository: UserRepository,
  ) { }

  public async createUser(createUserDto: CreateUserDto) {
    return await this.usersRepository.createUser(createUserDto);
  }

  public async findAllUsers() {
    return await this.usersRepository.getAllUsers();
  }

  public async findOneUser(id: UserEntity['id']) {
    return await this.usersRepository.getAllUsers();
  }

  public async changeUser(id: UserEntity['id'], updateUserDto: UpdateUserDto) {
    return await `This action updates a #${id} user`;
  }

  public async removeUser(id: UserEntity['id']) {
    return await `This action removes a #${id} user`;
  }


}

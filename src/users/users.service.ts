import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './users.repository';
import { UserSearchDto } from './dto/search-user.dto';

@Injectable()
export class UsersService {

  constructor(
    private _repository: UserRepository,
  ) { }

  public async createUser(createUserDto: UserCreateDto) {
    return await this._repository.createUser(createUserDto);
  }

  public async findOneUser(id: UserEntity['id']) {
    return await this._repository.selectSafeUserById(id);
  }

  public async searchUsers(queries: UserSearchDto){
    console.debug(queries);

    return await this._repository.selectManyUsers(queries);
  }

  public async changeUser(id: UserEntity['id'], updateUserDto: UserUpdateDto) {
    return await `This action updates a #${id} user`;
  }
}

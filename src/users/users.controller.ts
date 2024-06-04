import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Post()
  public async create(
    @Body() createUserDto: CreateUserDto
  ) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get('/all')
  public async getAllUsers() {
    return await this.usersService.findAllUsers();
  }

  @Get(':id')
  public async getUser(
    @Param('id') id: UserEntity['id']
  ) {
    return await this.usersService.findOneUser(id);
  }

  @Patch(':id')
  public async putUser(
    @Param('id') id: UserEntity['id'],
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.usersService.changeUser(id, updateUserDto);
  }

  @Delete(':id')
  public async deleteUser(
    @Param('id') id: UserEntity['id']
  ) {
    return await this.usersService.removeUser(id);
  }
}

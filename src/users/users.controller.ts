import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { SearchUserDto } from './dto/search-user.dto';

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

  @Get('/search')
  public async getManyUsers(
		@Query() queries?: SearchUserDto
  ) {
    return await this.usersService.findAllUsers();
  }

  @Get(':id')
  public async getUser(
    @Param('id') id: string
  ) {
    return await this.usersService.findOneUser(id);
  }

  @Patch(':id')
  public async putUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.usersService.changeUser(id, updateUserDto);
  }

  @Delete(':id')
  public async deleteUser(
    @Param('id') id: string
  ) {
    return await this.usersService.removeUser(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';
import { UserSearchDto } from './dto/search-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Post()
  public async create(
    @Body() createUserDto: UserCreateDto
  ) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get('/search')
  public async getManyUsers(
		@Query() queries?: UserSearchDto
  ) {
    return await this.usersService.searchUsers(queries);
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
    @Body() updateUserDto: UserUpdateDto
  ) {
    return await this.usersService.changeUser(id, updateUserDto);
  }
}

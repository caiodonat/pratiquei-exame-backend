import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';
import { UserSearchDto } from './dto/search-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Post()
  @ApiOperation({ summary: `Cadastrar um Usuário` })
  public async create(
    @Body() createUserDto: UserCreateDto
  ) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get('/search')
  @ApiOperation({ summary: `Pesquisar Usuários` })
  public async getManyUsers(
    @Query() queries?: UserSearchDto
  ) {
    return await this.usersService.searchUsers(queries);
  }

  @Get(':id')
  @ApiOperation({ summary: `Obter dados de um Usuário por ID` })
  public async getUser(
    @Param('id') id: string
  ) {
    return await this.usersService.findOneUser(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Atualizar cadastro de um Usuário` })
  public async putUser(
    @Param('id') id: string,
    @Body() updateUserDto: UserUpdateDto
  ) {
    return await this.usersService.changeUser(id, updateUserDto);
  }
}

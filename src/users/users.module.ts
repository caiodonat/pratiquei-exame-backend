import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { UserRepository } from './users.repository';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [DatabaseModule, Repository],
  controllers: [UsersController],
  providers: [
    UserEntity,
    ...usersProviders,
    UsersService, UserRepository],
})

export class UsersModule { }

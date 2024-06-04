import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './users.providers';
import { UserRepository } from './users.repository';
import { Repository } from 'typeorm';

@Module({
  imports: [DatabaseModule, Repository],
  controllers: [UsersController],
  providers: [
    ...usersProviders,
    UsersService, UserRepository],
})

export class UsersModule { }

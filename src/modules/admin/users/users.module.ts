import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { HashingModule } from 'src/modules/hashing/hashing.module';

@Module({
  imports: [
    HashingModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule { }

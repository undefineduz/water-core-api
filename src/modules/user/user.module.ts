import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractsUserUsers, User } from 'src/database/entities';
import { UserRepository } from './repositories/user.repository';
import { ContractUserUsersRepository } from './repositories/contracts-user-users.repository';
import { ContractRepository } from './repositories/contract.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ContractsUserUsers]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, ContractRepository, ContractUserUsersRepository],
  exports: [UserService]
})
export class UserModule { }

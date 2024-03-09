import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { Repository } from 'typeorm';
import { UserRepository } from './repositories/user.repository';
import { ActiveUserData, IPagination } from 'src/common/interfaces';
// import { ContractRepository } from '../contract/contract.repository';
import { GetPagination } from 'src/common/decorators';
import { ContractStatusDto } from './dto/contract-status.dto';
import { ContractUserUsersRepository } from './repositories/contracts-user-users.repository';
import { ContractRepository } from './repositories/contract.repository';

@Injectable()
export class UserService {
  constructor(
    private usersRepository: UserRepository,
    private contractRepository: ContractRepository,
    private contractsUserUsersRepository: ContractUserUsersRepository
  ) { }

  public async getByUsername(username: string) {
    const user = await this.usersRepository.getByUsername(username);
    if (!user) {
      throw new NotFoundException('user not found by ' + username);
    }
    return user;
  }

  public async getById(id: number) {
    return await this.usersRepository.getById(id);
  }

  public async getProfile({ sub }: ActiveUserData) {
    return await this.usersRepository.getProfile(sub);
  }

  public async getContracts({ sub }: ActiveUserData, pagination: IPagination) {
    return await this.contractRepository.getAllWithPaginationByUserId(sub, pagination);
  }

  public async setContractStatusByUserId({ sub }: ActiveUserData, { status, id }: ContractStatusDto) {
    const isExistContract = await this.contractRepository.isExist(id);
    if (!isExistContract) {
      throw new NotFoundException('contract not found by ' + id);
    }
    try {
      return await this.contractsUserUsersRepository.save({
        userId: sub,
        contractId: id,
        status: status
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('contract already exist');
      }
    }
  }

  public async getVotedContracts({ sub }: ActiveUserData, pagination: IPagination) {
    return await this.contractsUserUsersRepository.getAllWithPaginationByUserId(sub, pagination);
  }

  public async getSensors({ sub }: ActiveUserData, pagination: IPagination) {
    return await this.usersRepository.getSensors(sub, pagination);
  }
}
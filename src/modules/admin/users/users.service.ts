import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { IPagination } from 'src/common/interfaces';
import { HashingService } from 'src/modules/hashing/hashing.service';
import { EntityNotFoundError } from 'typeorm';
import { User } from 'src/database/entities';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private hashingService: HashingService,
  ) { }

  public async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashingService.hash(createUserDto.password);
    return await this.usersRepository.createUser(createUserDto);
  }

  public async findOne(id: number): Promise<User> {
    try {
      return await this.usersRepository.getById(id);

    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('User not found by id ' + id);
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  public async getAll(pagination) {
    return await this.usersRepository.getAll(pagination);
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password)
      updateUserDto.password = await this.hashingService.hash(updateUserDto.password);
    await this.usersRepository.updateUser(id, updateUserDto);
  }

  public async delete(id: number) {
    await this.usersRepository.delete(id);
  }

}

import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { ActiveUserData } from 'src/common/interfaces';

@Injectable()
export class UserService {
  constructor(
    private usersRepository: UserRepository,
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

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

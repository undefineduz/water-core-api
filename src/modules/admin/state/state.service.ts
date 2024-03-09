import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { StateRepository } from './state.repository';
import { IPagination } from 'src/common/interfaces';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class StateService {
  constructor(
    private readonly stateRepository: StateRepository,
  ) { }

  async create(createStateDto: CreateStateDto) {
    try {
      return await this.stateRepository.save(createStateDto);
    } catch (err) {
      if (err.code == 'ER_DUP_ENTRY') {
        throw new ConflictException('State already exists');
      }
      console.error(err);
      throw new InternalServerErrorException('Error creating state');
    }

  }

  async findAll(pagination: IPagination) {
    return await this.stateRepository.findWithPagination(pagination);
  }

  async findOne(id: number) {
    try {
      return await this.stateRepository.findOneByOrFail({ id });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('State not found by id ' + id);
      }
      console.error(error);
      throw new InternalServerErrorException('Error finding state');
    }
  }

  async update(id: number, updateStateDto: UpdateStateDto) {
    try {
      await this.findOne(id);
      await this.stateRepository.update(id, updateStateDto);
      return {
        message: 'State updated successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('State not found by id ' + id);
      }
      throw new InternalServerErrorException('Error updating state');
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      await this.stateRepository.delete(id);
      return {
        message: 'State removed successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('State not found by id ' + id);
      }
      throw new InternalServerErrorException('Error removing state');

    }
  }
}

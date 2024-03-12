import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCoordinationDto } from './dto/create-coordination.dto';
import { UpdateCoordinationDto } from './dto/update-coordination.dto';
import { CoordinationsRepository } from './coordinations.repository';
import { IPagination } from 'src/common/interfaces';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class CoordinationsService {
  constructor(
    private readonly coordinationsRepository: CoordinationsRepository
  ) { }

  public async create(createCoordinationDto: CreateCoordinationDto) {
    return this.coordinationsRepository.save(createCoordinationDto);
  }

  public async findAll(pagination: IPagination) {
    return this.coordinationsRepository.getAllWithPagination(pagination);
  }

  public async findOne(id: number) {
    try {
      return await this.coordinationsRepository.findOneByOrFail({ id });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Coordination not found');
      }
      console.error(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  public async update(id: number, updateCoordinationDto: UpdateCoordinationDto) {
    await this.findOne(id);
    await this.coordinationsRepository.update(id, updateCoordinationDto);
    return {
      message: 'Coordination updated successfully'
    };
  }

  public async remove(id: number) {
    await this.findOne(id);
    await this.coordinationsRepository.delete(id);
    return {
      message: 'Coordination deleted successfully'
    };
  }
}

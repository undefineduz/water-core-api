import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { RegionRepository } from './region.repository';
import { IPagination } from 'src/common/interfaces';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class RegionService {
  constructor(
    private readonly regionRepository: RegionRepository,
  ) { }

  async create(createRegionDto: CreateRegionDto) {
    try {
      return await this.regionRepository.save(createRegionDto);
    } catch (error) {
      console.error(error);
      if (error.code == 'ER_DUP_ENTRY') {
        throw new ConflictException('Region already exists');
      }

      if (error.code == 'ER_NO_REFERENCED_ROW_2') {
        throw new ConflictException('State does not exist');
      }

      throw new InternalServerErrorException();
    }
  }

  async findAll(stateId: number, pagination: IPagination) {
    return this.regionRepository.findWithPagination(stateId, pagination);
  }

  async findOne(id: number) {
    try {
      return await this.regionRepository.findOneByOrFail({ id });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Region not found by id ' + id);
      }
      throw new InternalServerErrorException('Error finding region');
    }
  }

  public async update(id: number, updateRegionDto: UpdateRegionDto) {
    try {
      await this.findOne(id);
      await this.regionRepository.update(id, updateRegionDto);
      return {
        message: 'Region updated successfully'
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Region not found by id ' + id);
      }
      if (error.code == 'ER_DUP_ENTRY') {
        throw new ConflictException('Region already exists');
      }

      if (error.code == 'ER_NO_REFERENCED_ROW_2') {
        throw new ConflictException('State does not exist');
      }
      console.error(error);

      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      await this.regionRepository.delete(id);
      return {
        message: 'Region deleted successfully'
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Region not found by id ' + id);
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}

import { Injectable } from '@nestjs/common';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { UpdateConsumptionDto } from './dto/update-consumption.dto';
import { ConsumptionRepository } from './consumption.repository';

@Injectable()
export class ConsumptionService {
  constructor(
    private readonly consumptionRepository: ConsumptionRepository
  ) { }

  public async create(createConsumptionDto: CreateConsumptionDto) {
    return await this.consumptionRepository.createConsumption(createConsumptionDto);
  }

  findAll() {
    return `This action returns all consumption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consumption`;
  }

  update(id: number, updateConsumptionDto: UpdateConsumptionDto) {
    return `This action updates a #${id} consumption`;
  }

  remove(id: number) {
    return `This action removes a #${id} consumption`;
  }
}

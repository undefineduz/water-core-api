import { Injectable } from '@nestjs/common';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { UpdateConsumptionDto } from './dto/update-consumption.dto';
import { ConsumptionRepository } from './consumption.repository';
import { DateIntervalDto } from './dto/date-interval.dto';

@Injectable()
export class ConsumptionService {
  constructor(
    private readonly consumptionRepository: ConsumptionRepository
  ) { }

  public async create(createConsumptionDto: CreateConsumptionDto) {
    const getNotHours = new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" }).split(' ')[1].split(':')[0];
    if (Number(getNotHours) >= 0) {

    }
    return await this.consumptionRepository.createConsumption(createConsumptionDto);
  }

  public async findAll(userId: number, dateIntervalDto: DateIntervalDto) {
    return  await this.consumptionRepository.getStatistic(userId, dateIntervalDto);
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

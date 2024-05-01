import { Injectable } from '@nestjs/common';
import { CreateTotalConsumptionDto } from './dto/create-total-consumption.dto';
import { UpdateTotalConsumptionDto } from './dto/update-total-consumption.dto';

@Injectable()
export class TotalConsumptionService {
  create(createTotalConsumptionDto: CreateTotalConsumptionDto) {
    return 'This action adds a new totalConsumption';
  }

  findAll() {
    return `This action returns all totalConsumption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} totalConsumption`;
  }

  update(id: number, updateTotalConsumptionDto: UpdateTotalConsumptionDto) {
    return `This action updates a #${id} totalConsumption`;
  }

  remove(id: number) {
    return `This action removes a #${id} totalConsumption`;
  }
}

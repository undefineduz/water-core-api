import { Module } from '@nestjs/common';
import { TotalConsumptionService } from './total-consumption.service';
import { TotalConsumptionController } from './total-consumption.controller';
import { TotalConsumptionRepository } from './total-consumption.repository';

@Module({
  controllers: [TotalConsumptionController],
  providers: [TotalConsumptionRepository, TotalConsumptionService],
})
export class TotalConsumptionModule { }

import { Module } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';
import { ConsumptionController } from './consumption.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumption } from 'src/database/entities';
import { ConsumptionRepository } from './consumption.repository';
import { CoordinationsRepository } from '../admin/coordinations/coordinations.repository';
import { SensorsRepository } from '../admin/sensors/sensors.repository';
import { TotalConsumptionRepository } from 'src/total-consumption/total-consumption.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Consumption
    ]),
  ],
  controllers: [ConsumptionController],
  providers: [ConsumptionService, ConsumptionRepository, CoordinationsRepository, SensorsRepository, TotalConsumptionRepository],
})
export class ConsumptionModule { }

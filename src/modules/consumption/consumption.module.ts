import { Module } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';
import { ConsumptionController } from './consumption.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumption } from 'src/database/entities';
import { ConsumptionRepository } from './consumption.repository';
import { CoordinationsRepository } from '../admin/coordinations/coordinations.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Consumption
    ]),
  ],
  controllers: [ConsumptionController],
  providers: [ConsumptionService, ConsumptionRepository, CoordinationsRepository],
})
export class ConsumptionModule { }

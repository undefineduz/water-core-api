import { Module } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';
import { ConsumptionController } from './consumption.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumption } from 'src/database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Consumption
    ]),
  ],
  controllers: [ConsumptionController],
  providers: [ConsumptionService],
})
export class ConsumptionModule { }

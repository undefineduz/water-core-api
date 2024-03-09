import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from 'src/database/entities';
import { SensorsRepository } from './sensors.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sensor
    ]),
  ],
  controllers: [SensorsController],
  providers: [SensorsService, SensorsRepository],
})
export class SensorsModule { }

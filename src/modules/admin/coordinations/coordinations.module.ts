import { Module } from '@nestjs/common';
import { CoordinationsService } from './coordinations.service';
import { CoordinationsController } from './coordinations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coordinations } from 'src/database/entities';
import { CoordinationsRepository } from './coordinations.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Coordinations
    ]),
  ],
  controllers: [CoordinationsController],
  providers: [CoordinationsService, CoordinationsRepository],
})
export class CoordinationsModule { }

import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { RegionRepository } from './region.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regions } from 'src/database/entities/region.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Regions]),
  ],
  controllers: [RegionController],
  providers: [RegionService, RegionRepository],
})
export class RegionModule {}

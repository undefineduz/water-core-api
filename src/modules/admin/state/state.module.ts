import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { States } from 'src/database/entities';
import { StateRepository } from './state.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([States]),
  ],
  controllers: [StateController],
  providers: [StateService, StateRepository],
})
export class StateModule {}

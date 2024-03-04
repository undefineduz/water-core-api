import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from 'src/database/entities';
import { ContractRepository } from './contract.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contract])
  ],
  controllers: [ContractController],
  providers: [ContractService, ContractRepository],
})
export class ContractModule { }

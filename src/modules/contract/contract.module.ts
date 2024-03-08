import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractRepository } from './contract.repository';

@Module({
  providers: [ContractService, ContractRepository],
})
export class ContractModule { }

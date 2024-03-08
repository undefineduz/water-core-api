import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { IPagination } from 'src/common/interfaces';
import { ContractRepository } from './contract.repository';

@Injectable()
export class ContractService {
  constructor(
    private readonly contractRepository: ContractRepository
  ) { }

  async findAll(userId: number, pagination: IPagination) {
    return await this.contractRepository.getAllWithPagination(userId, pagination);
  }

  findOne(id: number) {
    return `This action returns a #${id} contract`;
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}

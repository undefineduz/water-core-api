import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractRepository } from './contract.repository';
import { QueryFailedError } from 'typeorm';
import { IPagination } from 'src/common/interfaces';

@Injectable()
export class ContractService {
  constructor(
    private readonly contractRepository: ContractRepository
  ) { }
  public async create(createContractDto: CreateContractDto) {
    try {
      return await this.contractRepository.save(createContractDto);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  public async findAll(pagination: IPagination) {
    return `This action returns all contract`;
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

import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractRepository } from './contract.repository';
import { QueryFailedError } from 'typeorm';
import { IPagination } from 'src/common/interfaces';
import { ContractUserUsersRepository } from 'src/modules/user/repositories/contracts-user-users.repository';

@Injectable()
export class ContractService {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractUserUsersRepository: ContractUserUsersRepository
  ) { }
  public async create(createContractDto: CreateContractDto) {
    try {
      const contract = await this.contractRepository.save(createContractDto);
      await this.contractUserUsersRepository.save(createContractDto.userId.map(userId => ({ userId, contractId: contract.id })));
      return contract;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  public async findAll(pagination: IPagination) {
    return await this.contractRepository.getAllWithPagination(pagination);
  }

  public async findOne(id: number) {
    return await this.contractRepository.findOne({
      relations: {
        contractsUsers: true
      },
      where: {
        id
      }
    })
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}

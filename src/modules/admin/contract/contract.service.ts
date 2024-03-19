import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractRepository } from './contract.repository';
import { QueryFailedError } from 'typeorm';
import { IPagination } from 'src/common/interfaces';
import { ContractUserUsersRepository } from 'src/modules/user/repositories/contracts-user-users.repository';
import { asset } from 'src/common/helper';
import { GetVoitedDto } from './dto/get-voited.dto';

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

  public async getVoited(pogination: IPagination, { status }: GetVoitedDto) {
    try {
      const qb = this.contractUserUsersRepository
        .createQueryBuilder('contractUser')
        .leftJoinAndSelect('contractUser.user', 'user')
        .leftJoinAndSelect('contractUser.contract', 'contract')
        .leftJoinAndSelect('contract.file', 'file')
        .select([
          'contractUser.id',
          'contractUser.status',
          'contractUser.report',
          'contractUser.createdAt',
          'user.id',
          'user.firstName',
          'user.lastName',
          'user.middleName',
          'user.phone',
          'user.avatar',
          'contract.id',
          'contract.title',
          'contract.createdAt',
          'file.id',
          'file.filename',
        ])

      if (status) {
        qb.andWhere('contractUser.status = :status', { status });
      }

      if (pogination.search) {
        const where = pogination.search && Object.keys(pogination.search).map(key => `${key} LIKE '%${pogination.search[key]}%'`).join(' AND ');
        qb.where(where);
      }

      const [data, count] = await qb
        .skip(pogination.skip)
        .take(pogination.limit)
        .orderBy(pogination.sort)
        .getManyAndCount();

      data.forEach(item => {
        item.contract.file['fileUrl'] = asset(item.contract.file.filename);
        delete item.contract.file.filename;
      });

      return { data, count };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }
      console.error("Error fetching data:", error);
      throw error; // rethrow the error for handling at a higher level
    }
  }



}

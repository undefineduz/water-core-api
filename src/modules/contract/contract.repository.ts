import { Injectable, NotFoundException } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces';
import { Contract } from 'src/database/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ContractRepository extends Repository<Contract> {
    constructor(private dataSource: DataSource) {
        super(Contract, dataSource.createEntityManager());
    }

    public async getAllWithPagination(userId: number, { limit, skip, sort, search }: IPagination) {
        const contractQb = this.createQueryBuilder('contract')
            .innerJoinAndSelect('contract.file', 'file')
            .select("contract.id", "id")
            .addSelect("contract.title", "title")
            .addSelect("contract.fileId", "fileId")
            .addSelect("CONCAT('http://localhost:3000/', file.filename)", "file")
            .addSelect("contract.createdAt", "createdAt")
        if (search) {
            contractQb.where('contract.title like :search', { search: `%${search}%` });
        }
        if (sort) {
            contractQb.orderBy(sort);
        }
        contractQb
            .skip(skip)
            .take(limit);

        const data = await contractQb.getRawMany();
        const count = await contractQb.getCount();
        return { data, count };

    }

    public async isExist(contractId: number): Promise<Contract | false> {
        const contract = await this.findOneBy({ id: contractId });
        if (!contract) {
            return false;
        }
        return contract;
    }

}

import { Injectable } from '@nestjs/common';
import { baseUrl } from 'src/common/helper';
import { IPagination } from 'src/common/interfaces';
import { Contract } from 'src/database/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ContractRepository extends Repository<Contract> {
    constructor(private dataSource: DataSource) {
        super(Contract, dataSource.createEntityManager());
    }

    public async getById(id: number): Promise<Contract> {
        return await this.findOneBy({ id });
    }

    public async getAllWithPagination({ limit, skip, sort, search }: IPagination) {
        const contractQb = this.createQueryBuilder('contract')
            .innerJoinAndSelect('contract.file', 'file')
            .select("contract.id", "id")
            .addSelect("contract.title", "title")
            .addSelect("contract.fileId", "fileId")
            .addSelect(`CONCAT('${baseUrl}/', file.filename)`, "file")
            .addSelect("contract.createdAt", "createdAt")
        if (search) {
            contractQb.where('contract.title like :search', { search: `%${search}%` });
        }
        if (sort) {
            contractQb.orderBy(sort[0].field, sort[0].by);
        }
        contractQb
            .skip(skip)
            .take(limit);

        const data = await contractQb.getRawMany();
        const count = await contractQb.getCount();
        return { data, count };

    }


}

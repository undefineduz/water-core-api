import { BadRequestException, Injectable } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces';
import { Contract } from 'src/database/entities';
import { DataSource, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class ContractRepository extends Repository<Contract> {
    constructor(private dataSource: DataSource) {
        super(Contract, dataSource.createEntityManager());
    }

    public async getAllWithPaginationByUserId(userId: number, { limit, skip, sort, search }: IPagination) {
        try {
            const contractQb = this.createQueryBuilder('contract')
                .innerJoinAndSelect('contract.file', 'file')
                .select("contract.id", "id")
                .addSelect("contract.title", "title")
                .addSelect("contract.fileId", "fileId")
                .addSelect("CONCAT('http://localhost:3000/', file.filename)", "file")
                .where("contract.id NOT IN " +
                    "(SELECT contractId FROM contracts_user_users WHERE userId = :userId)", { userId })

            if (search) {
                const where = search && Object.keys(search).map(key => `${key} LIKE '%${search[key]}%'`).join(' AND ');
                contractQb.andWhere(where);
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
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new BadRequestException(error.message);
            }
            console.error(error);
        }

    }

    public async isExist(contractId: number): Promise<Contract | false> {
        const contract = await this.findOneBy({ id: contractId });
        if (!contract) {
            return false;
        }
        return contract;
    }
}

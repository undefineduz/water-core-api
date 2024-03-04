import { Injectable } from '@nestjs/common';
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

    public async getAllWithPagination(pagination: IPagination) {
        const contractQb = await this.createQueryBuilder('contract')
            
    }

}

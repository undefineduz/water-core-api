import { Injectable } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces';
import { States } from 'src/database/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class StateRepository extends Repository<States> {

    constructor(private dataSource: DataSource) {
        super(States, dataSource.createEntityManager());
    }

    async findWithPagination({ limit, search, skip, sort }: IPagination) {
        const query = this.createQueryBuilder('state');
        if (search) {
            query.where('state.name LIKE :search', { search: `%${search}%` });
        }
        if (sort) {
            query.orderBy(sort);
        }
        query.skip(skip);
        query.take(limit);

        const data = await query.getMany();
        const count = await query.getCount();
        return { data, count };
    }

} 
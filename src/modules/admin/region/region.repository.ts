import { Injectable } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces';
import { Regions } from 'src/database/entities/region.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RegionRepository extends Repository<Regions> {

    constructor(private dataSource: DataSource) {
        super(Regions, dataSource.createEntityManager());
    }

    public async findWithPagination(stateId: number, { limit, search, skip, sort }: IPagination) {
        const query = this.createQueryBuilder('region')
            .where('region.stateId = :stateId', { stateId })
            .take(limit)
            .skip(skip)

        if (search) {
            const where = search && Object.keys(search).map(key => `${key} LIKE '%${search[key]}%'`).join(' AND ');
            query.where(where);
        }

        if (sort) {
            query.orderBy(sort);
        }

        const data = await query.getMany();
        const count = await query.getCount();

        return { data, count };
    }


} 
import { Injectable } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces';
import { Sensor } from 'src/database/entities';
import { DataSource, EntityPropertyNotFoundError, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class SensorsRepository extends Repository<Sensor> {

    constructor(private dataSource: DataSource) {
        super(Sensor, dataSource.createEntityManager());
    }

    async getAllWithPagination({ limit, search, skip, sort }: IPagination) {
        const query = this.createQueryBuilder('sensor')
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

    public async getSensorsByUserId(userId: number, { limit, search, skip, sort }: IPagination) {
        const query = this.createQueryBuilder('sensor')
          .where('userId = :userId', { userId })
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
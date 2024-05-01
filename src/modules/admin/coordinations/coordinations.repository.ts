import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces';
import { Coordinations } from 'src/database/entities';
import { DataSource, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class CoordinationsRepository extends Repository<Coordinations> {

    constructor(private dataSource: DataSource) {
        super(Coordinations, dataSource.createEntityManager());
    }

    async getAllWithPagination({ limit, search, skip, sort }: IPagination) {
        try {
            const query = this.createQueryBuilder('coordinations')
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
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new BadRequestException(error.message);
            }
            console.error(error);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async calculateQ(measured_distance: number) {
        const isCheckCoordinationEqualH = await this.findOneBy({ h: measured_distance });
        if (measured_distance == isCheckCoordinationEqualH?.h) {
            return isCheckCoordinationEqualH.q;
        }

        const coordinationsLess = await this.findOneBy({
            h: LessThan(measured_distance)
        });

        const coordinationMore = await this.findOneBy({
            h: MoreThan(measured_distance)
        });

        const q1 = coordinationsLess?.q ?? 0;
        const h1 = coordinationsLess?.h ?? 0;

        const q2 = coordinationMore?.q ?? 0;
        const h2 = coordinationMore?.h ?? 0;

        console.log('h1:', h1)
        console.log('h2:', h2)

        const q = q1 + (q2 - q1) * (measured_distance - h1) / (h2 - h1)
        console.log(q, 'q')
        return q;
    }
} 
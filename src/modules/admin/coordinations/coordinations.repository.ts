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

    async calculateQ(h: number) {
        const isCheckCoordinationEqualH = await this.findOneBy({ h });
        if (h == isCheckCoordinationEqualH?.h) {
            return isCheckCoordinationEqualH.q;
        }

        const coordinationsLess = await this.findOneBy({
            h: LessThan(h)
        });

        const coordinationMore = await this.findOneBy({
            h: MoreThan(h)
        });

        const q1 = coordinationsLess?.q;
        const h1 = coordinationsLess?.h;

        const q2 = coordinationMore?.q;
        const h2 = coordinationMore?.h;

        const q = q1 + (q2 - q1) * (h - h1) / (h2 - h1)
        return q;
    }
} 
import { ConflictException, Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces';
import { User } from 'src/database/entities';
import { DataSource, EntityPropertyNotFoundError, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends Repository<User> {

    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    public async createUser(data: Partial<User>): Promise<User> {
        try {
            return await this.save(data);
        } catch (error) {
            if (error instanceof EntityPropertyNotFoundError) {
                throw new UnprocessableEntityException(error.message);
            };

            if (error.code == 'ER_DUP_ENTRY') {
                throw new ConflictException(error.sqlMessage);
            }
            console.error(error);
            throw new InternalServerErrorException();
        }
    }

    public async getById(id: number): Promise<User> {
        return await this.findOneByOrFail({ id });
    }

    public async getAll({ limit, search, skip, sort, regionId }: IPagination | any) {
        try {

            const where = search && Object.keys(search).map(key => `${key} LIKE '%${search[key]}%'`).join(' AND ');


            const qb = this.createQueryBuilder('user')
                .limit(limit)
                .skip(skip)
                .orderBy(sort)

            if (where) {
                qb.where(where);
            }
            if (regionId) {
                qb.andWhere('regionId = :regionId', { regionId });
            }

            const [data, count] = await qb
                .getManyAndCount();
            return { data, count };
        } catch (error) {
            console.error(error);
            if (error instanceof EntityPropertyNotFoundError) {
                throw new UnprocessableEntityException(error.message);
            };
            throw new InternalServerErrorException();
        }
    }

    public async updateUser(id: number, data: Partial<User>) {
        try {
            console.log(data);
            return await this.update(id, data);
        } catch (error) {
            if (error instanceof EntityPropertyNotFoundError) {
                throw new UnprocessableEntityException(error.message);
            };

            if (error.code == 'ER_DUP_ENTRY') {
                throw new ConflictException(error.sqlMessage);
            }
            console.error(error);
            throw new InternalServerErrorException();
        }
    }

    public async getContracts(id: number) {
        return await this.findOne({
            select: {
                id: true,
                contractsUsers: {
                    id: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    contract: {
                        id: true,
                        title: true,
                        createdAt: true,
                        file: { 
                            id: true,
                            filename: true
                        }
                    }
                }
            },
            relations: {
                contractsUsers: {
                    contract: {
                        file: true
                    }
                }
            },
            where: { id },
        })
    }
} 
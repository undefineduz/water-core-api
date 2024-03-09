import { Injectable } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces';
import { User } from 'src/database/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {

    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    public async getByUsername(username: string): Promise<User> {
        return await this.createQueryBuilder('user')
            .select(['user.id', 'user.username', 'user.password', 'user.role'])
            .where('user.username = :username', { username })
            .getOne();
    }

    public async getById(id: number): Promise<User> {
        return await this.findOneByOrFail({ id });
    }

    public async getProfile(id: number): Promise<User> {
        return await this.findOneOrFail({
            select: [
                'id',
                'avatar',
                'username',
                'firstName',
                'lastName',
                'middleName',
                'passport',
                'phone',
                'latitude',
                'longitude',
            ],
            where: { id }
        });
    }

    public async getContracts(UserId: number): Promise<User> {
        const user = await this.findOne({
            where: { id: UserId },
            relations: {
                contracts: true
            }
        });
        return user;
    }

    public async getSensors(userId: number, { limit, skip, sort, search }: IPagination) {
        const contractQb = this.createQueryBuilder('user')
            .innerJoinAndSelect('user.sensors', 'sensor')
            .select("sensor.id", "id")
            .addSelect("sensor.imei", "imei")
            .addSelect("sensor.name", "name")
            .where('user.id = :userId', { userId: userId });

        if (search) {
            const where = search && Object.keys(search).map(key => `${key} LIKE '%${search[key]}%'`).join(' AND ');
            contractQb.andWhere(where);
        }

        if (sort) {
            contractQb.orderBy(sort)
        }
        contractQb
            .skip(skip)
            .take(limit);

        const data = await contractQb.getRawMany();
        const count = await contractQb.getCount();

        return { data, count };
    }
}
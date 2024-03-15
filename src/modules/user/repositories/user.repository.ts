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
                contractsUsers: true
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

    public async getConsumption(userId: number) {
        const user = await this.findOneOrFail({
            select: {
                id: true,
                sensors: {
                    id: true,
                    name: true,
                    imei: true,
                    consumptions: {
                        id: true,
                        h: true,
                        charging: true,
                        createdAt: true,
                        imei: true,
                        latitude: true,
                        longitude: true,
                        q: true,
                        s: true,
                        temperature: true,
                        v_bat: true,
                        velocity: true,
                        width: true,
                    }
                }
            },
            where: { id: userId },
            relations: {
                sensors: {
                    consumptions: true,
                }
            },
            order: {
                sensors: {
                    consumptions: {
                        createdAt: 'DESC'
                    }
                }
            }
        });

        let totalConsumptionTime = 0;
        for (const sensor of user.sensors) {
            if (sensor.consumptions.length) {
                sensor.consumptions.map(consumption => {
                    totalConsumptionTime += new Date(consumption.createdAt).getTime();
                });
            }
        }
        return {
            totalConsumptionTime: this.formatMillisecondsToTime(totalConsumptionTime),
            sensors: user.sensors
        };
    }

    formatMillisecondsToTime(milliseconds) {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}
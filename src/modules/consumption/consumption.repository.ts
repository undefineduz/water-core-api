import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces';
import { Consumption, Settings } from 'src/database/entities';
import { DataSource, Repository } from 'typeorm';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { CoordinationsRepository } from '../admin/coordinations/coordinations.repository';
import { SensorsRepository } from '../admin/sensors/sensors.repository';
import { TotalConsumptionRepository } from 'src/total-consumption/total-consumption.repository';
import { DateIntervalDto } from './dto/date-interval.dto';

@Injectable()
export class ConsumptionRepository extends Repository<Consumption> {

    constructor(
        private readonly coordinationsRepository: CoordinationsRepository,
        private readonly sensorRepository: SensorsRepository,
        private readonly totalConsumptionRepository: TotalConsumptionRepository,
        private dataSource: DataSource) {
        super(Consumption, dataSource.createEntityManager());
    }

    public async createConsumption(createConsumptionDto: CreateConsumptionDto) {

        //todo
        // 1. check is exists by imei
        // 2. check is exist total consumption by imei
        // 2.1 if not exists consumption's createAt check is it 00:00
        // 2.2 if it is 00:00 create new total-consumption
        // 2.3 else create new total-consumption
        //check is exists by imei
        const isExists = await this.sensorRepository.findOne({
            relations: {
                user: true,
            },
            select: {
                id: true,
                imei: true,
                user: {
                    id: true,
                    height: true,
                    alpha: true,
                    beta: true,
                    bottom_length: true
                }
            },
            where: { imei: createConsumptionDto.imei }
        });

        if (!isExists) {
            throw new NotFoundException(`Sensor with imei ${createConsumptionDto.imei} not found`);
        }

        if (!isExists.user) {
            throw new BadRequestException(`User with sensor not relation imei: ${createConsumptionDto.imei}`);
        }

        //check is exist total consumption by imei
        const isExistsTotalConsumption = await this.totalConsumptionRepository.findOne({
            where: {
                sensorId: isExists.id,
            }
        });

        const qCardinateTable = await this.coordinationsRepository.calculateQ(createConsumptionDto.measured_distance);

        const oldConsumption = await this
            .createQueryBuilder('consumption')
            .select(['consumption.id', 'consumption.velocity', 'consumption.createdAt'])
            .orderBy('consumption.id', 'DESC')
            .getOne();

        // lavel = height - measured_distance
        const lavel = isExists.user.height - createConsumptionDto.measured_distance;

        // S = lavel * bottom_length + 0.5 * (lavel * lavel) * (tg(alpha) + tg(beta))
        const S = lavel * isExists.user.bottom_length + 0.5 * Math.pow(lavel, 2) * (Math.tan(isExists.user.alpha) + Math.tan(isExists.user.beta));

        const velocityAverage = oldConsumption ? (createConsumptionDto.velocity + oldConsumption.velocity) / 2 : createConsumptionDto.velocity;
        const timeDifference = velocityAverage > 0 && oldConsumption?.createdAt ? +((new Date().getTime() - new Date(oldConsumption.createdAt).getTime()) / 6000).toFixed(2) : 0;
        console.log(timeDifference);
        //Q = timeDifference * velocityAverage * S
        const Q = timeDifference * velocityAverage * S;

        const create = this.create({
            ...createConsumptionDto,
            velocityAverage,
            timeDifference,
            q: Q,
            q_cordinate_table: qCardinateTable,
            createdAt: new Date(),
            S: S,
            userId: isExists.user.id,
        });
        const newConsumption = await this.save(create);
        return newConsumption;
    };

    public async getStatistic(userId: number, dateIntervalDto: DateIntervalDto) {
        const queryBuilder = this.createQueryBuilder('consumption')
            .select('SUM(c.timeDifference)', 'totalTime')
            .addSelect(`DATE(c.createdAt)`, 'date')
            .addSelect('SUM(c.q)', 'q')
            .addSelect('SUM(c.q) / SUM(c.timeDifference)', 'v')
            .addSelect('SUM(c.q) * s.value', 'amout')
            .from(Consumption, 'c')
            .innerJoin(Settings, 's', 's.key = :key', { key: 'price' })
            .where('c.createdAt >= :startDate AND c.createdAt <= :endDate', { startDate: dateIntervalDto.from, endDate: dateIntervalDto.to })
            .andWhere('c.userId = :userId', { userId })
            .groupBy('DATE(c.createdAt)')
            .addGroupBy('s.value');

        const result = await queryBuilder.getRawMany();
        return result;
    }


}

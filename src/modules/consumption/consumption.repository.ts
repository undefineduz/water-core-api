import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces';
import { Consumption } from 'src/database/entities';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { CoordinationsRepository } from '../admin/coordinations/coordinations.repository';
import { SensorsRepository } from '../admin/sensors/sensors.repository';

@Injectable()
export class ConsumptionRepository extends Repository<Consumption> {

    constructor(
        private readonly coordinationsRepository: CoordinationsRepository,
        private readonly sensorRepository: SensorsRepository,
        private dataSource: DataSource) {
        super(Consumption, dataSource.createEntityManager());
    }

    public async createConsumption(createConsumptionDto: CreateConsumptionDto) {
        //check is exists by imei
        const isExists = await this.sensorRepository.findOneBy({ imei: createConsumptionDto.imei });
        if (!isExists) {
            throw new NotFoundException(`Sensor with imei ${createConsumptionDto.imei} not found`);
        }
        const q = await this.coordinationsRepository.calculateQ(createConsumptionDto.h);
        console.log('q:', q);
        try {
            const create = this.create({
                ...createConsumptionDto,
                q
            });
            return await this.save(create);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new BadRequestException(error.message);
            }
            console.error(error);
        }
    };

} 
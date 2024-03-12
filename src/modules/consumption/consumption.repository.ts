import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IPagination } from 'src/common/interfaces';
import { Consumption } from 'src/database/entities';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { CoordinationsRepository } from '../admin/coordinations/coordinations.repository';

@Injectable()
export class ConsumptionRepository extends Repository<Consumption> {

    constructor(
        private readonly coordinationsRepository: CoordinationsRepository,
        private dataSource: DataSource) {
        super(Consumption, dataSource.createEntityManager());
    }

    public async createConsumption(createConsumptionDto: CreateConsumptionDto) {
        const q = await this.coordinationsRepository.calculateQ(createConsumptionDto.h);
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
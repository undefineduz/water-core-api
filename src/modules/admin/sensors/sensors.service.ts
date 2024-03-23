import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { SensorsRepository } from './sensors.repository';
import { IPagination } from 'src/common/interfaces';
import { Code, EntityNotFoundError, IsNull, QueryFailedError } from 'typeorm';
import { SttachSensorToUserDto } from './dto/attach-sensor-to-user.dto';

@Injectable()
export class SensorsService {
  constructor(
    private readonly sensorsRepository: SensorsRepository
  ) { }

  async create(createSensorDto: CreateSensorDto) {
    try {
      return await this.sensorsRepository.save(createSensorDto);
    } catch (error) {
      if (error.code == 'ER_DUP_ENTRY') {
        throw new ConflictException('Sensor already exists by imei: ' + createSensorDto.imei);
      }
      console.log(error);
    }
  }

  public async findAll(pagination: IPagination) {
    return await this.sensorsRepository.getAllWithPagination(pagination);
  }

  public async findOne(id: number) {
    try {
      return await this.sensorsRepository.findOneByOrFail({ id });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Sensor not found by id ' + id);
      }
      console.error(error);

    }
  }

  public async update(id: number, updateSensorDto: UpdateSensorDto) {
    try {
      await this.sensorsRepository.update(id, updateSensorDto);
      return {
        message: 'Sensor updated'
      }
    } catch (error) {
      if (error.code == 'ER_DUP_ENTRY') {
        throw new ConflictException('Sensor already exists by imei: ' + updateSensorDto.imei);
      }
      console.log(error);
    }
  }

  public async remove(id: number) {
    await this.sensorsRepository.delete(id);
    return {
      message: 'Sensor removed'
    }
  }

  public async attachSensorToUser({ sensorId, userId }: SttachSensorToUserDto) {
    try {
      const sensor = await this.sensorsRepository.findOneByOrFail({ id: sensorId, userId: IsNull() });
      await this.sensorsRepository.update(sensor.id, { userId });
      return {
        message: 'Sensor attached to user'
      }
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Sensor not found by id ' + sensorId);
      }

      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }
      console.error(error);
    }
  }

  public async getFermersSensors (id: number, pagination: IPagination) {
    const sensors = await this.sensorsRepository.getSensorsByUserId(id, pagination);
    return sensors;
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumptionDto } from './create-consumption.dto';

export class UpdateConsumptionDto extends PartialType(CreateConsumptionDto) {}

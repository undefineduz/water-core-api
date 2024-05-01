import { PartialType } from '@nestjs/mapped-types';
import { CreateTotalConsumptionDto } from './create-total-consumption.dto';

export class UpdateTotalConsumptionDto extends PartialType(CreateTotalConsumptionDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateCoordinationDto } from './create-coordination.dto';

export class UpdateCoordinationDto extends PartialType(CreateCoordinationDto) {}

import { SetMetadata } from '@nestjs/common';
import { ROLE_KEY } from '../constants';
import { Role } from '../enums';

export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums';
import { AUTH_TYPE_KEY } from '../constants';

/**
 * Decorator that sets the metadata for the authentication types.
 * @param authTypes The authentication types to be set as metadata.
 * @returns A function that sets the metadata for the authentication types.
 */
export const Auth = (...authTypes: AuthType[]) =>
    SetMetadata(AUTH_TYPE_KEY, authTypes);
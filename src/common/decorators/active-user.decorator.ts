import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { REQUEST_USER_KEY } from '../constants';

/**
 * Custom decorator that retrieves the active user from the request object.
 * @param field - Optional field name to retrieve a specific property from the active user.
 * @param ctx - The execution context containing the request object.
 * @returns The active user object or a specific property of the active user.
 */
export const ActiveUser = createParamDecorator(
    (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user: ActiveUserData | undefined = request[REQUEST_USER_KEY];
        return field ? user?.[field] : user;
    },
);
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../enums';
import { ActiveUserData } from '../interfaces';
import { REQUEST_USER_KEY, ROLE_KEY } from '../constants';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const contextRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!contextRoles) {
            return true;
        }
        const user: ActiveUserData = context.switchToHttp().getRequest()[
            REQUEST_USER_KEY
        ];
        return contextRoles.some((role) => user.role?.includes(role));
    }
}
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtConfig } from '../configs';
import { REQUEST_USER_KEY } from '../constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(JwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof JwtConfig>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractAccessTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                this.jwtConfiguration,
            );
            request[REQUEST_USER_KEY] = payload;
        } catch (error) {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractAccessTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return undefined;
        }
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return undefined;
        }
        return token;
    }
}
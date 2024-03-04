import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto';
import { JwtConfig } from 'src/common/configs';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/database/entities';
import { randomUUID } from 'crypto';
import { ActiveUserData } from 'src/common/interfaces';
import { InvalidatedRefreshTokenError, RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { UserService } from '../user/user.service';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(JwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof JwtConfig>,
        private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
        private readonly userService: UserService,
    ) { }

    async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        try {
            const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
                Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
            >(refreshTokenDto.refreshToken, {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
            });

            const user = await this.userService.getById(sub);
            const isValid = await this.refreshTokenIdsStorage.validate(
                user.id,
                refreshTokenId,
            );

            if (!isValid) {
                throw new UnauthorizedException('Refresh token is not valid');
            }
            await this.refreshTokenIdsStorage.invalidate(user.id);
            return this.generateTokens(user);
        } catch (error) {
            if (error instanceof InvalidatedRefreshTokenError) {
                throw new UnauthorizedException('Access denied');
            }
            throw new UnauthorizedException();
        }
    }

    private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload,
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn,
            },
        );
    }

    public async generateTokens(user: User) {
        const refreshTokenId = randomUUID();
        const [accessToken, refreshToken] = await Promise.all([
            // accessToken
            this.signToken<Partial<ActiveUserData>>(
                user.id,
                this.jwtConfiguration.accessTokenTtl,
                { username: user.username, role: user.role},
            ),
            // refreshToken
            this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
                refreshTokenId,
            }),
        ]);
        await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
        return {
            accessToken,
            refreshToken,
        };
    }
}

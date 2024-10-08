import {
    Injectable,
    OnApplicationBootstrap,
    OnApplicationShutdown,
} from '@nestjs/common';

import { Redis } from 'ioredis';

export class InvalidatedRefreshTokenError extends Error { }

@Injectable()
export class RefreshTokenIdsStorage
    implements OnApplicationBootstrap, OnApplicationShutdown {
    private redisClient: Redis;

    public onApplicationBootstrap() {
        this.redisClient = new Redis({
            host: 'redis',
            port: 6379,
        });
    }

    public onApplicationShutdown(signal?: string) {
        return this.redisClient.quit();
    }

    public async insert(userId: number, tokenId: string): Promise<void> {
        await this.redisClient.set(this.getRedisKey(userId), tokenId);
    }

    public async validate(userId: number, tokenId: string): Promise<boolean> {
        const storedId = await this.redisClient.get(this.getRedisKey(userId));
        if (storedId !== tokenId) {
            throw new InvalidatedRefreshTokenError();
        }
        return storedId === tokenId;
    }

    public async invalidate(userId: number): Promise<void> {
        await this.redisClient.del(this.getRedisKey(userId));
    }

    private getRedisKey(userId: number): string {
        return `user-${userId}`;
    }
}
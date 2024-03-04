import * as path from 'path';
import * as NestConfig from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DatabseConfig = NestConfig.registerAs('database', (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    logger: 'file',
    timezone: '+05:00',
    autoLoadEntities: true,
    subscribers: [
        path.resolve(__dirname, '..', '..', 'src', 'database', 'factories', '*{.ts,.js}')
    ],
    migrations: [
        path.resolve(__dirname, '..', '..', 'database', 'migrations', '*{.ts,.js}')
    ],
}));
import * as path from 'path';
import * as NestConfig from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const DatabseConfig = NestConfig.registerAs('database', (): TypeOrmModuleOptions | DataSourceOptions => ({
    type: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
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
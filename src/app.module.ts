import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';
import { DatabaseModule } from './database/database.module';
import * as Configs from './common/configs';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exceptions/filters';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [
        Configs.ServerConfig,
        Configs.DatabseConfig,
        Configs.JwtConfig
      ],
      cache: true,
    }),
    ModulesModule,
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }

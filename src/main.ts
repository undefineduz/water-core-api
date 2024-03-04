import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ConfigService, ConfigType } from '@nestjs/config';
import { ServerConfig } from './common/configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression({
    level: 5,
    threshold: 1024
  }));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    })
  );

  const config = app.get(ConfigService);
  const server = config.get<ConfigType<typeof ServerConfig>>('server');

  await app.listen(server.port, server.host, async () => {
    console.log(`🚀🚀🚀 Application is running on: ${await app.getUrl()} 🚀🚀🚀`);
  });
}
bootstrap();

import * as config from 'config';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { logger } from './logger';

async function bootstrap() {
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);

  const environment = process.env.NODE_ENV || 'development'

  if (environment === 'development')
    app.enableCors();
  else if (environment === 'production')
    app.setGlobalPrefix('api');

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  const message = `Application started in ${environment} and listening on port ${port}`;
  Logger.log(message);
  logger.debug(message);
}
bootstrap();

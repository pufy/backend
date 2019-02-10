import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestEnvironment } from '@nestjs/common/enums/nest-environment.enum';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { APP_PORT, APP_HOST, APP_URL_PREFIX, NODE_ENV } from "./common/environment";

async function bootstrap() {
  Logger.setMode((NODE_ENV === "production") ? NestEnvironment.TEST : NestEnvironment.RUN);
  const logger = new Logger('HttpsServer');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(APP_URL_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  
  await app.listen(APP_PORT || '3000');

  logger.log(`Server running on ${APP_HOST}:${APP_PORT || '3000'}/${APP_URL_PREFIX}`);
}
bootstrap();

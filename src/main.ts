import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Config } from 'config/validation';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe());

  const port =
    app.get<ConfigService<Config>>(ConfigService).get<number>('port') ?? 80;

  await app.listen(port, `0.0.0.0`);

  const url = await app.getUrl();
  Logger.log(`Running on ${url}`);

  if (!app.get(ConfigService).get('linkBaseUrl')) {
    app.get(ConfigService).set('linkBaseUrl', `${url}/link`);
  }
}
bootstrap();

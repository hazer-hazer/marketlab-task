import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkService } from './link/link.service';
import { LinkController } from './link/link.controller';
import { configModule } from 'config/config';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';
import { Config } from 'config/validation';

@Module({
  imports: [configModule],
  controllers: [AppController, LinkController],
  providers: [AppService, LinkService, PrismaService, ConfigService<Config>],
})
export class AppModule {}

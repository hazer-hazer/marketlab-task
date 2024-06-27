import { Test, TestingModule } from '@nestjs/testing';
import { LinkService } from './link.service';
import { configModule } from 'config/config';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';

describe('LinkService', () => {
  let service: LinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, LinkService, PrismaService],
      imports: [configModule],
    }).compile();

    service = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

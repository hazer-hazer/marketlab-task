import { Test, TestingModule } from '@nestjs/testing';
import { LinkController } from './link.controller';
import { GoneException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LinkService } from './link.service';
import { configModule } from 'config/config';

describe('LinkController', () => {
  let controller: LinkController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkController],
      providers: [PrismaService, LinkService],
      imports: [configModule],
    }).compile();

    controller = module.get<LinkController>(LinkController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getting unused link should pass', async () => {
    const link = {
      id: 'abc',
      content: 'test',
      active: true,
      createdAt: new Date(),
      usedAt: new Date(),
    };
    prisma.link.findUnique = jest.fn().mockReturnValueOnce(link);
    prisma.link.update = jest.fn().mockReturnValueOnce({
      ...link,
      usedAt: new Date(),
    });

    await expect(controller.getLink('abc')).resolves.toBe('test');
  });

  it('getting nonexistent link should fail', async () => {
    prisma.link.findUnique = jest.fn().mockReturnValueOnce(null);

    await expect(() => controller.getLink('abc')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('getting used link should fail', async () => {
    prisma.link.findUnique = jest.fn().mockReturnValueOnce({
      id: 'abc',
      content: 'test',
      active: false,
      createdAt: new Date(),
      usedAt: new Date(),
    });

    await expect(() => controller.getLink('abc')).rejects.toThrow(
      GoneException,
    );
  });

  it('creating link should pass', async () => {
    const creationResult = {
      id: 'abc',
      content: 'test',
      active: true,
      createdAt: new Date(),
      usedAt: new Date(),
    };

    prisma.link.create = jest.fn().mockReturnValueOnce(creationResult);

    await expect(
      controller.createLink({
        content: creationResult.content,
      }),
    ).resolves.toBe(`localhost:3000/${creationResult.id}`);
  });
});

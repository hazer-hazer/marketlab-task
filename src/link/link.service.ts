import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Link, Prisma } from '@prisma/client';
import { Config } from 'config/validation';
import * as path from 'node:path';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LinkService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly prisma: PrismaService,
  ) {}

  private makeLinkUrl(id: Link['id']): string {
    const url = new URL(this.configService.get('linkBaseUrl'));
    url.pathname = path.join(url.pathname, id);
    return url.href;
  }

  public async get(id: Link['id']): Promise<Link | null> {
    return this.prisma.link.findUnique({
      where: {
        id,
      },
    });
  }

  public async use(id: Link['id']) {
    const updated = await this.prisma.link.update({
      where: { id },
      data: { active: false },
    });

    if (!updated) {
      throw new ConflictException('Failed to mark link as used');
    }
  }

  public async create(data: Prisma.LinkCreateInput): Promise<string> {
    const link = await this.prisma.link.create({
      data,
    });

    return this.makeLinkUrl(link.id);
  }
}

import {
  Body,
  Controller,
  Get,
  GoneException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { Link } from '@prisma/client';
import { LinkService } from './link.service';
import { CreateLinkDto, GetLinkParams } from './dto';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get(':id')
  async getLink(@Param() params: GetLinkParams): Promise<Link['content']> {
    const { id } = params;

    const link = await this.linkService.get(id);

    if (link === null) {
      throw new NotFoundException('Link not found');
    }

    if (!link.active) {
      throw new GoneException('Link is already used');
    }

    await this.linkService.use(id);

    return link.content;
  }

  @Post()
  async createLink(@Body() body: CreateLinkDto): Promise<Link['id']> {
    const linkUrl = await this.linkService.create({
      content: body.content,
    });

    return linkUrl;
  }
}

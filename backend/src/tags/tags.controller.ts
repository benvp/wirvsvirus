import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { TagsService } from './tags.service';
import { Tag } from './tag.entity';
import { ApiAuthGuard } from '../auth/apiAuth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly service: TagsService) { }

  @Get('/:text')
  getTag(@Param('text') text: string): Promise<Tag[]> {
    return this.service.findTag(text);
  }

  @Post()
  @UseGuards(ApiAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.TRIMMED, Role.TRIMMER)
  createTag(@Body() dto: CreateTagDto): Promise<Tag> {
    return this.service.createTag(dto);
  }
}

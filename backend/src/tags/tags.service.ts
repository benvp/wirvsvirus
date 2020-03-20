import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsRepository } from './tags.repository';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsRepository)
    private repository: TagsRepository,
    @Inject('winston')
    private readonly logger: Logger,
  ) { }

  getAll = async () =>
    this.repository.getAll();

  findTag = (str: string) =>
    this.repository.findTag(str);

  createTag = async (dto: CreateTagDto) =>
    this.repository.createTag(dto);

}
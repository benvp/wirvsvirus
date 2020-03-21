import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsRepository } from './tags.repository';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsRepository)
    private repository: TagsRepository
  ) { }

  getAll = () =>
    this.repository.getAll();

  getById = async (id: number) => {
    const entity = await this.repository.findOne(id);

    if (!entity)
      throw new NotFoundException(`Tag with ID ${id} not found`);
    return entity;
  }

  findTag = (str: string) =>
    this.repository.findTag(str);

  createTag = (dto: CreateTagDto) =>
    this.repository.createTag(dto);

}
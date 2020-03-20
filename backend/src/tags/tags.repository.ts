import { EntityRepository, Like, Repository } from 'typeorm';

import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './tag.entity';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {
  getAll = async (): Promise<Tag[]> =>
    this.find({
      order: { name: 'ASC' }
    });

  findTag = async (str: string): Promise<Tag[]> =>
    this.find({
      order: { name: 'ASC' },
      where: { name: Like(`${str}%`) }
    });

  createTag = async (dto: CreateTagDto) => {
    const tag = new Tag();
    tag.name = dto.name;
    return tag.save();
  }
}
import * as config from 'config';

import { EntityRepository, Like, Repository } from 'typeorm';

import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './tag.entity';

const dbConfig = config.get('db');

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {
  getAll = async (): Promise<Tag[]> =>
    this.find({
      order: { text: 'ASC' }
    });

  findTag = async (str: string): Promise<Tag[]> => {
    const query = this.createQueryBuilder();
    const conditions = dbConfig.type === 'mysql'
      ? ['text'].map(f => `${f} LIKE :search`).join(' OR ')
      : ['text'].map(f => `"${f}" ILIKE :search`).join(' OR ');

    query.where(conditions, { search: `${str}%` });
    query.orderBy('text', 'ASC');
    return query.getMany();
  }

  createTag = async (dto: CreateTagDto) => {
    const tag = new Tag();
    tag.text = dto.text;
    return tag.save();
  }
}
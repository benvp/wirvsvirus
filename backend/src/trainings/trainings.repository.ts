import * as config from 'config';

import { EntityRepository, Repository } from 'typeorm';

import { PagingResult } from '../types';
import { Training } from './training.entity';

const dbConfig = config.get('db');

@EntityRepository(Training)
export class TrainingsRepository extends Repository<Training> {
  getAll = async (search?: string, page: number = 0, itemsPerPage: number = 20): Promise<PagingResult<Training>> => {
    const query = this.createQueryBuilder('training')
    const tQuery = this.createQueryBuilder();

    if (search && search.trim() !== '') {
      const searchFields = [
        'name', 'description'
      ];
      const conditions = (process.env.DB_TYPE || dbConfig.type) === 'mysql'
        ? searchFields.map(f => `${f} LIKE :search`).join(' OR ')
        : searchFields.map(f => `"${f}" ILIKE :search`).join(' OR ');

      query.where(conditions, { search: `%${search}%` });
      tQuery.where(conditions, { search: `%${search}%` });
    }
    query.take(itemsPerPage).skip(page * itemsPerPage);
    query.orderBy('training.createdDate', 'DESC');
    query.leftJoinAndSelect('training.host', 'host')
    query.leftJoinAndSelect('training.tags', 'tags')
    query.leftJoinAndSelect('training.attendees', 'attendees')
    query.leftJoinAndSelect('host.profilePicture', 'hprofilePicture')
    query.leftJoinAndSelect('attendees.profilePicture', 'aprofilePicture')
    const items = await query.getMany();
    const total = await tQuery.getCount();

    return {
      items,
      itemCount: items.length,
      total,
      pageCount: Math.ceil(total / itemsPerPage),
    }
  };

  hasTrainings = async (): Promise<boolean> => {
    const count = await this.count();
    return count > 0;
  };

}
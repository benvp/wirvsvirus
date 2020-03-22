import { EntityRepository, Repository } from 'typeorm';

import { Logger } from '@nestjs/common';
import { Picture } from './picture.entity';

@EntityRepository(Picture)
export class PicturesRepository extends Repository<Picture> {
  private logger = new Logger('PicturesRepository');
}

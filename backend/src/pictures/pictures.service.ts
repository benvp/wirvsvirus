import {
  Injectable,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from 'winston';
import { InjectRepository } from '@nestjs/typeorm';
import { Picture } from './picture.entity';
import { PicturesRepository } from './pictures.repository';


@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(PicturesRepository)
    private repository: PicturesRepository,
  ) { }

  /**
   * Gets a specific receipt by id.
   * @param {string} id - The id of the receipt.
   */
  getPictureById = async (id: string): Promise<Picture> => {
    if (!id)
      return null;
    const entity = await this.repository.findOne(id);

    if (!entity)
      throw new NotFoundException(`Picture with ID ${id} not found`);
    return entity;
  };

  createPicture = (fileName: string) => {
    const entity = new Picture();
    entity.id = fileName.split('.')[0];
    entity.filename = fileName;
    return entity.save();
  }
}

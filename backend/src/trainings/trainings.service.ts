import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingsRepository } from './trainings.repository';
import { CreateTrainingDto } from './dto/create-training.dto';
import { Training } from './training.entity';
import { SearchDto } from '../dto/search.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TrainingsService {
  constructor(
    @InjectRepository(TrainingsRepository)
    private repository: TrainingsRepository,
    @Inject('winston')
    private readonly logger: Logger,
  ) { }

  getAll = () => this.repository.getAll();

  find = (dto: SearchDto) =>
    this.repository.getAll(dto.search, dto.page, dto.itemsPerPage);

  getById = async (id: number): Promise<Training> => {
    const entity = await this.repository.findOne(id);

    if (!entity)
      throw new NotFoundException(`Training with ID ${id} not found`);
    return entity;
  };

  createTraining = async (dto: CreateTrainingDto, user?: User) => {
    const training = new Training();
    training.createdDate = new Date();
    training.date = dto.date;
    training.name = dto.name;
    training.description = dto.description;
    training.conferenceLink = dto.videoLink;
    training.pictureLink = dto.pictureLink;
    training.professional = dto.professional;

    training.host = user;

    // FIXME: Implement tags resolving
    await training.save();
    delete training.host;
    return training;
  }
}
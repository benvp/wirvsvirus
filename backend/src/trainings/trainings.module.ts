import { Module } from '@nestjs/common';
import { TagsRepository } from 'src/tags/tags.repository';
import { TagsService } from 'src/tags/tags.service';
import { TrainingsController } from './trainings.controller';
import { TrainingsRepository } from './trainings.repository';
import { TrainingsService } from './trainings.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrainingsRepository,
      TagsRepository,
    ]),
  ],
  controllers: [TrainingsController],
  providers: [
    TrainingsService,
    TagsService,
  ],
})
export class TrainingsModule { }

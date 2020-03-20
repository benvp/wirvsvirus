import { Module } from '@nestjs/common';
import { TrainingsController } from './trainings.controller';
import { TrainingsRepository } from './trainings.repository';
import { TrainingsService } from './trainings.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrainingsRepository,
    ]),
  ],
  controllers: [TrainingsController],
  providers: [
    TrainingsService,
  ],
})
export class TrainingsModule { }

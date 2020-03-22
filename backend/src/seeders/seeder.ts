import * as seedTrainings from './trainings.json';
import * as tags from './tags.json';

import { Injectable, Logger } from '@nestjs/common';

import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { CreateTagDto } from '../tags/dto/create-tag.dto';
import { CreateTrainingDto } from '../trainings/dto/create-training.dto';
import { Role } from '../auth/roles.enum';
import { TagsRepository } from '../tags/tags.repository';
import { TrainingsRepository } from '../trainings/trainings.repository';
import { TrainingsService } from '../trainings/trainings.service';
import { UsersRepository } from '../auth/users.repository';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly uRepository: UsersRepository,
    private readonly tRepository: TrainingsRepository,
    private readonly tService: TrainingsService,
    private readonly tagRepository: TagsRepository
  ) { }

  async seed() {
    this.logger.log('Start seeding...');
    // const dto = new GetMasterDataFilterDto();
    // const profiles = await this.profilesService.getProfiles(dto);
    // console.log('Profiles:', profiles);

    const hasUsers = await this.uRepository.hasUsers();
    const hasTrainings = await this.tRepository.hasTrainings();
    const hasTags = await this.tagRepository.hasTags();

    if (!hasUsers && !hasTrainings && !hasTags) {
      this.logger.log(
        'No users, trainings and tags found. Seeding...',
      );

      const adminPwd = process.env.ADMIN_PASSWORD;
      if (!adminPwd)
        throw new Error('Please provide an initial admin password with the environment variable ADMIN_PASSWORD!');

      // Admin User
      const credentials = new AuthCredentialsDto();
      credentials.username = 'admin';
      credentials.password = adminPwd;
      credentials.displayName = 'admin';
      credentials.profilePicture = 'placeholder_' + String(Math.floor(Math.random() * Math.floor(4)))

      await this.uRepository.signUp(credentials, Role.ADMIN);

      // Trainings and Hosts
      // await this.seedSampleUsersAndTrainings();

      // Tags...
      for (const t of tags) {
        const tag = new CreateTagDto()
        tag.text = t
        await this.tagRepository.createTag(tag)
      }
    }
  }

  seedSampleUsersAndTrainings = async () => {
    for (const seed of seedTrainings) {
      const train = new CreateTrainingDto();
      train.name = seed.name
      train.date = new Date(0)
      train.date.setUTCSeconds(seed.date)
      train.description = seed.description
      train.youtubeVideo = seed.youtubeVideo
      train.pictureLink = seed.pictureLink
      train.professional = seed.professional

      // Mock Users
      const creds = new AuthCredentialsDto();
      creds.username = seed.host
      creds.password = seed.host + '1234';
      creds.displayName = seed.host;
      creds.profilePicture = 'placeholder_' + String(Math.floor(Math.random() * Math.floor(4)))
      await this.uRepository.signUp(creds, Role.TRIMMER);

      const user = await this.uRepository.getUserByName(seed.host)
      await this.tService.createTraining(train, user);
    }
  }
}

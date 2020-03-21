import { Injectable, Logger } from '@nestjs/common';

import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { CreateTrainingDto } from '../trainings/dto/create-training.dto';
import { Role } from '../auth/roles.enum';
import { UsersRepository } from '../auth/users.repository';
import { TrainingsService } from '../trainings/trainings.service';
import * as seedTrainings from './trainings.json';
import * as tags from './tags.json';
import { TrainingsRepository } from 'src/trainings/trainings.repository';
import { TagsRepository } from 'src/tags/tags.repository';
import { CreateTagDto } from 'src/tags/dto/create-tag.dto';

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

        // Admin User
        const credentials = new AuthCredentialsDto();
        credentials.username = 'admin';
        credentials.password = 'admin1234'; // FIXME: Use an initial password from environment variable
        credentials.displayName = 'admin';
        credentials.profilePicture = 'placeholder_' + String(Math.floor(Math.random() * Math.floor(4)))

        await this.uRepository.signUp(credentials, Role.ADMIN);
        
        // Trainings and Hosts
        for (const seed of seedTrainings) {
            const train = new CreateTrainingDto();
            train.name = seed.name
            train.date = new Date(0)
            train.date.setUTCSeconds(seed.date)
            train.description = seed.description
            train.conferenceLink = seed.conferenceLink
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

        // Tags...
        for (const t of tags) {
            const tag = new CreateTagDto()
            tag.text = t
            await this.tagRepository.createTag(tag)
        }

    }

  }
}

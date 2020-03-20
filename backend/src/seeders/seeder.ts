import { Injectable, Logger } from '@nestjs/common';

import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { Role } from '../auth/roles.enum';
import { UsersRepository } from '../auth/users.repository';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly uRepository: UsersRepository,
  ) { }

  async seed() {
    this.logger.log('Start seeding...');
    // const dto = new GetMasterDataFilterDto();
    // const profiles = await this.profilesService.getProfiles(dto);
    // console.log('Profiles:', profiles);

    const hasUsers = await this.uRepository.hasUsers();
    if (!hasUsers) {
      this.logger.log(
        'No users existing. Create initial admin user with default credentials...',
      );
      const credentials = new AuthCredentialsDto();
      credentials.username = 'admin';
      credentials.password = 'admin1234'; // FIXME: Use an initial password from environment variable
      credentials.displayName = 'admin';

      await this.uRepository.signUp(credentials, Role.ADMIN);
    }
  }
}

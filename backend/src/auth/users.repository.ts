import * as bcrypt from 'bcrypt';

import { BaseUser, User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Role } from './roles.enum';
import { logger } from '../logger';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto, role?: Role): Promise<BaseUser> {
    const { username, password, displayName } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.role = role ? role : Role.TRIMMED;
    user.displayName = displayName;
    user.profilePicturePlaceholder = 'placeholder_' + String(Math.floor(Math.random() * Math.floor(4)))

    try {
      await user.save();
      return {
        displayName: user.displayName,
        username: user.username,
        id: user.id,
        role: user.role,
        donationLink: user.donationLink,
        about: user.about,
        profilePicture: user.profilePicture,
        profilePicturePlaceholder: user.profilePicturePlaceholder,
      };
    } catch (error) {
      logger.error(error);
      if (error.code === '23505')
        // Duplicate username
        throw new ConflictException('Tenant already exists');
      else throw new InternalServerErrorException();
    }
  }

  async updateUser(
    user: User,
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<BaseUser> {
    const { username, password, displayName } = authCredentialsDto;

    user.username = username;
    if (password) {
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
    }
    user.displayName = displayName;

    try {
      await user.save();
      return {
        displayName: user.displayName,
        username: user.username,
        id: user.id,
        role: user.role,
        donationLink: user.donationLink,
        about: user.about,
        profilePicture: user.profilePicture,
        profilePicturePlaceholder: user.profilePicturePlaceholder,
      };
    } catch (error) {
      logger.error(error);
      if (error.code === '23505')
        // Duplicate username
        throw new ConflictException('Username already exists');
      else throw new InternalServerErrorException();
    }
  }

  validateUserPassword = async (
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<BaseUser> => {
    const { username, password } = authCredentialsDto;
    const user = await this.createQueryBuilder('user')
    .select(['user.id', 'user.username', 'user.displayName', 'user.role', 'user.donationLink', 'user.about', 'user.profilePicturePlaceholder'])
    .addSelect('user.password')
    .addSelect('user.salt')
    .leftJoinAndSelect('user.profilePicture', 'profilePicture')
    .where({ username })
    .getOne();

    if (user && (await user.validatePassword(password)))
      return {
        displayName: user.displayName,
        username: user.username,
        id: user.id,
        role: user.role,
        donationLink: user.donationLink,
        about: user.about,
        profilePicture: user.profilePicture,
        profilePicturePlaceholder: user.profilePicturePlaceholder,
      };
    else return null;
  };

  hashPassword = async (password: string, salt: string): Promise<string> =>
    bcrypt.hash(password, salt);

  hasUsers = async (): Promise<boolean> => {
    const count = await this.count();
    return count > 0;
  };

  getAdminUser = async (): Promise<User> =>
    await this.findOne({ username: 'admin' });
    
  getUserByName = async (name: string): Promise<User> =>
    await this.findOne({ username: name });

  getAllAdmins = async (): Promise<User[]> =>
    await this.find({ role: Role.ADMIN });

  getAllUsers = async (): Promise<User[]> =>
    await this.createQueryBuilder('user')
      .orderBy('username', 'ASC')
      .getMany();
}

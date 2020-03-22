import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User, BaseUser } from './user.entity';
import { Role } from './roles.enum';
import { PicturesService } from 'src/pictures/pictures.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private pictureService: PicturesService,
  ) { }

  createUser = async (
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<BaseUser> => this.usersRepository.signUp(authCredentialsDto);

  updateUser = async (
    id: string,
    dto: AuthCredentialsDto,
    user: User,
  ): Promise<BaseUser> => {
    const entity = await this.getUserById(id);
    if (entity.id !== user.id)
      throw new ForbiddenException('You cannot edit another user.');
    return await this.usersRepository.updateUser(entity, dto);
  };

  deleteUser = async (id: string): Promise<void> => {
    const user = await this.getUserById(id);
    // Prevent the deletion of the last existing administrator
    if (user.role === Role.ADMIN) {
      const admins = await this.usersRepository.getAllAdmins();
      if (admins.length <= 1)
        throw new ConflictException(
          'You cannot delete the last existing administrator',
        );
    }

    let result;
    try {
      result = await this.usersRepository.delete(id);
    } catch (error) {
      console.log('Fehler', error.code);
      throw error;
    }

    if (result && result.affected === 0)
      throw new NotFoundException(`Tenant with ID ${id} not found`);
  };

  getUserById = async (id: string): Promise<User> => {
    const entity = await this.usersRepository.findOne(id);

    if (!entity) throw new NotFoundException(`User with ID ${id} not found`);
    return entity;
  };

  signIn = async (
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; user: BaseUser }> => {
    const user = await this.usersRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!user) throw new UnauthorizedException('Invalid username or password');

    const payload: JwtPayload = { username: user.username };
    const accessToken = await this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        displayName: user.displayName,
        username: user.username,
        id: user.id,
        role: user.role,
        donationLink: user.donationLink,
        about: user.about,
        profilePicture: user.profilePicture,
        profilePicturePlaceholder: user.profilePicturePlaceholder,
      },
    };
  };

  getAllUsers = async (): Promise<User[]> => {
    return await this.usersRepository.getAllUsers();
  };

  setProfilePicture = async (userId: string, receiptFileName: string): Promise<User> => {
    const user = await this.getUserById(userId);
    const picture = await this.pictureService.createPicture(receiptFileName);
    user.profilePicture = picture;
    user.save();
    return user;
  }
}

import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Delete,
  Param,
  Patch,
  UnauthorizedException,
  BadRequestException,
  Res,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User, BaseUser } from './user.entity';
import { GetUser } from './get-user.decorator';
import { ApiAuthGuard } from './apiAuth.guard';
import * as path from 'path'
import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuid } from 'uuid';
import { diskStorage } from 'multer';
import { Roles } from './roles.decorator';
import { Role } from './roles.enum';
import { RolesGuard } from './roles.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/auth/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/auth/register')
  @UseGuards(ApiAuthGuard, RolesGuard)
  createUser(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<BaseUser> {
    if (authCredentialsDto.password == null)
      throw new BadRequestException('Please provide a password when creating a user.');

    return this.authService.createUser(authCredentialsDto);
  }

  @Delete('/auth/user/:id')
  @UseGuards(ApiAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.authService.deleteUser(id);
  }

  @Patch('/auth/user/:id')
  @UseGuards(ApiAuthGuard, RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.TRIMMED,
    Role.TRIMMER,
  )
  updateUser(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body(ValidationPipe) dto: AuthCredentialsDto,
  ): Promise<BaseUser> {
    return this.authService.updateUser(id, dto, user);
  }

  @Get('/auth/isSignedIn')
  @UseGuards(ApiAuthGuard)
  isSignedIn(@GetUser() user: User | boolean): BaseUser | boolean {
    if (user instanceof UnauthorizedException || user === false)
      return false;
    else {
      const u = user as User;
      return {
        displayName: u.displayName,
        username: u.username,
        id: u.id,
        role: u.role,
        donationLink: u.donationLink,
        about: u.about,
        profilePicture: u.profilePicture,
        profilePicturePlaceholder: u.profilePicturePlaceholder,
      };
    }
  }

  @Get('/auth/users')
  @UseGuards(ApiAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getUsers(): Promise<BaseUser[]> {
    const users = await this.authService.getAllUsers();
    
    return users.map(u => ({
      displayName: u.displayName,
      username: u.username,
      id: u.id,
      role: u.role,
      donationLink: u.donationLink,
      about: u.about,
      profilePicture: u.profilePicture,
      profilePicturePlaceholder: u.profilePicturePlaceholder,
    }));
  }

  @Post('/users/picture')
  @UseGuards(ApiAuthGuard, RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.TRIMMED,
    Role.TRIMMER,
  )
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './uploads/pictures',
        filename: (req, file, cb) => {
          let extension;
          switch (file.mimetype) {
            case 'image/jpeg':
              extension = 'jpg';
              break;
              case 'image/png':
              extension = 'png';
              break;
            default:
              throw new Error('Invalid extension');
          }
          return cb(null, `${uuid()}.${extension}`)
        }
      })
    }
  )
  )
  uploadFile(@GetUser() user: User, @UploadedFile() file) {
    return this.authService.setProfilePicture(user.id, file.filename);
  }

  @Get('/users/:userId/picture')
  async serveProfilePicture(@Param('userId') userId: string, @Res() res): Promise<any> {
    const user = await this.authService.getUserById(userId);
    if (!user.profilePicture)
      throw new NotFoundException('This user does not have a profile picture.');

    const resolvedPath = path.resolve(`./uploads/pictures/${user.profilePicture.filename}`);
    if (fs.existsSync(resolvedPath)) {
      res.sendFile(resolvedPath);
    } else {
      throw new NotFoundException('This user does not have a profile picture.');
    }
  }
}

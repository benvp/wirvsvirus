import * as config from 'config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PicturesRepository } from 'src/pictures/pictures.repository';
import { PicturesService } from 'src/pictures/pictures.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { passportModule } from '../passport.module';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    passportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([UsersRepository, PicturesRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PicturesService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

import * as config from 'config';

import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Seeder } from './seeder';
import { UsersRepository } from '../auth/users.repository';

import typeOrmConfig = require('../config/typeorm.config');

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    TypeOrmModule.forRoot(typeOrmConfig as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthService, Logger, Seeder],
})
export class SeederModule { }

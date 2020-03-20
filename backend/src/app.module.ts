import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { loggerOptions } from './logger';

import typeOrmConfig = require('./config/typeorm.config');

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig as TypeOrmModuleOptions),
    WinstonModule.forRoot(loggerOptions),
  ],
})
export class AppModule {}

import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { PicturesRepository } from './pictures.repository';
import { PicturesService } from './pictures.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { passportModule } from '../passport.module';

@Module({
  imports: [
    passportModule,
    TypeOrmModule.forFeature([PicturesRepository]),
    AuthModule,
  ],
  controllers: [],
  providers: [PicturesService],
})
export class PicturesModule {}

import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsRepository } from './tags.repository';
import { TagsService } from './tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TagsRepository,
    ]),
  ],
  controllers: [TagsController],
  providers: [
    TagsService,
  ],
})
export class TagsModule {}

import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe, HttpCode, Get, Param, ParseIntPipe } from '@nestjs/common';

import { TrainingsService } from './trainings.service';
import { Training } from './training.entity';
import { ApiAuthGuard } from '../auth/apiAuth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { CreateTrainingDto } from './dto/create-training.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { SearchDto } from '../dto/search.dto';
import { PagingResult } from '../types';

@Controller('trainings')
export class TrainingsController {
  constructor(private readonly service: TrainingsService) { }

  @Get()
  @HttpCode(200)
  @UseGuards(ApiAuthGuard, RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.TRIMMED,
    Role.TRIMMER,
  )
  getAll(): Promise<PagingResult<Training>> {
    return this.service.getAll();
  }

  @Post()
  @UseGuards(ApiAuthGuard, RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.TRIMMED,
    Role.TRIMMER,
  )
  @UsePipes(ValidationPipe)
  createTraining(
    @GetUser() user: User,
    @Body() dto: CreateTrainingDto,
  ): Promise<Training> {
    return this.service.createTraining(dto, user);
  }

  @Post('find')
  @HttpCode(200)
  @UseGuards(ApiAuthGuard, RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.TRIMMED,
    Role.TRIMMER,
  )
  find(
    @Body(ValidationPipe) searchDto: SearchDto,
  ): Promise<PagingResult<Training>> {
    return this.service.find(searchDto);
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(ApiAuthGuard, RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.TRIMMED,
    Role.TRIMMER,
  )
  getById(@Param('id', ParseIntPipe) id: number): Promise<Training> {
    return this.service.getById(id);
  }
}

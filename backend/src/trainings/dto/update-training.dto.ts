import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTrainingDto {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsOptional()
  tagIDs: number[];

  @IsNotEmpty()
  @IsOptional()
  date: Date;

  @IsNotEmpty()
  @IsOptional()
  youtubeVideo: string;

  @IsNotEmpty()
  @IsOptional()
  conferenceLink: string;

  @IsNotEmpty()
  @IsOptional()
  pictureLink: string;

  @IsNotEmpty()
  @IsOptional()
  professional: boolean;
}

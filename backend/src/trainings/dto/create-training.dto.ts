import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrainingDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsOptional()
  tagIDs: number[];

  @IsNotEmpty()
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
  professional: boolean;

  @IsNotEmpty()
  @IsOptional()
  recommendedDonation: number;
}

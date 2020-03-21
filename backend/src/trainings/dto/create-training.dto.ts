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
  videoLink: string;

  @IsNotEmpty()
  @IsOptional()
  pictureLink: string;

  @IsNotEmpty()
  professional: boolean;
}

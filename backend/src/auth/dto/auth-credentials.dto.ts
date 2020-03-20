import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(40)
  @IsOptional()
  displayName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(40)
  @IsOptional()
  url: string;
}

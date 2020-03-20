import { IsOptional, IsNotEmpty } from 'class-validator';

export class SearchDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  page: number;

  @IsOptional()
  @IsNotEmpty()
  itemsPerPage: number;
}

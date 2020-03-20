import { IsOptional, IsNotEmpty } from 'class-validator';

export class PagingDto {
  @IsOptional()
  @IsNotEmpty()
  page: number;

  @IsOptional()
  @IsNotEmpty()
  itemsPerPage: number;
}

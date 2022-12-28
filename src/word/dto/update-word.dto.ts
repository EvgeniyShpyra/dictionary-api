import { IsOptional, IsString } from 'class-validator';

export class UpdateWordDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  translation?: string;
}

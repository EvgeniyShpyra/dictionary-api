import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class DictionaryDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}

import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWordDto {
  @IsString()
  name: string;
  @IsString()
  translation: string;
  @IsOptional()
  @IsBoolean()
  isLearned?: boolean;
  @IsOptional()
  @IsNumber()
  dictionary?: number;
}

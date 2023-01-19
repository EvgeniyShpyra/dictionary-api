import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

class Word {
  @IsString()
  name: string;
  @IsString()
  translation: string;
}

export class CreateWordsDto {
  @IsBoolean()
  isPublic: boolean;
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  dictionaryName: string;
  @ValidateNested({ each: true })
  @Type(() => Word)
  words: Word[];
}

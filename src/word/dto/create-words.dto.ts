import { IsBoolean, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Word {
  @IsString()
  name: string;
  @IsString()
  translation: string;
}

export class CreateWordsDto {
  @IsBoolean()
  isPublic: boolean;
  @IsString()
  dictionaryName: string;
  @ValidateNested({ each: true })
  @Type(() => Word)
  words: Word[];
}

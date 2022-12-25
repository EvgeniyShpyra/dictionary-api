import { IsString } from 'class-validator';

export class DictionaryDto {
  @IsString()
  name: string;
}

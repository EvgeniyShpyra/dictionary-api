import { Controller, Get } from '@nestjs/common';

@Controller('dictionary')
export class DictionaryController {
  @Get('/')
  getDictionary() {}
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WordService } from './word.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { CreateWordDto } from './dto/create-word.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateWordDto } from './dto/update-word.dto';

@UseGuards(JwtAuthGuard)
@Controller('word')
export class WordController {
  constructor(private wordService: WordService) {}

  @Post('/dictionary/:id')
  createWord(
    @Param('id', ParseIntPipe) dictionaryId: number,
    @Body() createWordDto: CreateWordDto,
    @GetUser() user: User,
  ) {
    return this.wordService.createWord(dictionaryId, createWordDto, user);
  }

  @Get('/:id')
  getWord(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.wordService.getWord(id, user);
  }

  @Get('/dictionary/:id')
  getAllWords(
    @Param('id', ParseIntPipe) dictionaryId: number,
    @GetUser() user: User,
  ) {
    return this.wordService.getAllWords(dictionaryId, user);
  }

  @Get('/copy/:dictionaryId')
  copyDictionary(
    @Param('dictionaryId', ParseIntPipe) dictionaryId: number,
    @GetUser() user: User,
  ) {
    return this.wordService.copyDictionary(dictionaryId, user);
  }

  @Patch('/:id')
  updateWord(
    @Param('id', ParseIntPipe) wordId: number,
    @Body() updateWordDto: UpdateWordDto,
    @GetUser() user: User,
  ) {
    return this.wordService.updateWord(wordId, updateWordDto, user);
  }

  @Delete('/:id')
  deleteWord(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.wordService.deleteWord(id, user);
  }

  @Get('/')
  searchWord(@Query('therm') therm: string, user: User) {
    return this.wordService.searchWord(therm, user);
  }
}

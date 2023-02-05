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
import { CreateWordsDto } from './dto/create-words.dto';

@Controller('word')
export class WordController {
  constructor(private wordService: WordService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/dictionary/:id')
  createWord(
    @Param('id', ParseIntPipe) dictionaryId: number,
    @Body() createWordDto: CreateWordDto,
    @GetUser() user: User,
  ) {
    return this.wordService.createWord(dictionaryId, createWordDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getWord(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.wordService.getWord(id, user);
  }

  @Get('/public/:dictionaryId')
  getAllWordsFromPublicDictionary(
    @Param('dictionaryId', ParseIntPipe) dictionaryId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.wordService.getAllWordsFromPublicDictionary(
      dictionaryId,
      page,
      limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/dictionary/:id')
  getAllWords(
    @Param('id', ParseIntPipe) dictionaryId: number,
    @GetUser() user: User,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.wordService.getAllWords(dictionaryId, user, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/dictionary')
  createDictionaryWithWords(
    @Body() createWordsDto: CreateWordsDto,
    @GetUser() user: User,
  ) {
    return this.wordService.createDictionaryWithWords(createWordsDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/copy/:dictionaryId')
  copyDictionary(
    @Param('dictionaryId', ParseIntPipe) dictionaryId: number,
    @GetUser() user: User,
  ) {
    return this.wordService.copyDictionary(dictionaryId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateWord(
    @Param('id', ParseIntPipe) wordId: number,
    @Body() updateWordDto: UpdateWordDto,
    @GetUser() user: User,
  ) {
    return this.wordService.updateWord(wordId, updateWordDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteWord(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.wordService.deleteWord(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  searchWord(@Query('therm') therm: string, user: User) {
    return this.wordService.searchWord(therm, user);
  }
}

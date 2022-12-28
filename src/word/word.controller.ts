import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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
    return this.wordService.createWord(createWordDto, user);
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
}

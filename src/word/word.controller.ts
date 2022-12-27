import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WordService } from './word.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { CreateWordDto } from './dto/createWordDto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('word')
export class WordController {
  constructor(private wordService: WordService) {}

  @Post('/')
  createWord(@Body() createWordDto: CreateWordDto, @GetUser() user: User) {
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
}

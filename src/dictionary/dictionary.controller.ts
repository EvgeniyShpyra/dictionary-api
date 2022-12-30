import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DictionaryDto } from './dto/dictionary.dto';
import { DictionaryService } from './dictionary.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post('/')
  createDictionary(
    @Body() dictionaryDto: DictionaryDto,
    @GetUser() user: User,
  ) {
    return this.dictionaryService.createDictionary(dictionaryDto, user);
  }

  @Get('/')
  getAllDictionaries(@GetUser() user: User) {
    return this.dictionaryService.getAllDictionaries(user);
  }

  @Get('/public')
  getAllPublicDictionaries() {
    return this.dictionaryService.getAllPublicDictionaries();
  }

  @Get('/:id')
  findOneDictionary(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.dictionaryService.findOneDictionary(id, user);
  }

  @Patch('/:id')
  updateDictionary(
    @Param('id', ParseIntPipe) id: number,
    @Body() dictionaryDto: DictionaryDto,
    @GetUser() user: User,
  ) {
    return this.dictionaryService.updateSingleDictionary(
      id,
      dictionaryDto,
      user,
    );
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  deleteDictionary(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.dictionaryService.deleteDictionary(id, user);
  }

  @Patch('/:id/status')
  changePrivacy(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.dictionaryService.changePrivacy(id, user);
  }
}

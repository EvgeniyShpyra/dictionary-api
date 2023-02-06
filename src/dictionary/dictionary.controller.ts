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
  Query,
  UseGuards,
} from '@nestjs/common';
import { DictionaryDto } from './dto/dictionary.dto';
import { DictionaryService } from './dictionary.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtOpenGuard } from '../auth/guards/jwt-open.guard';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  createDictionary(
    @Body() dictionaryDto: DictionaryDto,
    @GetUser() user: User,
  ) {
    return this.dictionaryService.createDictionary(dictionaryDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllDictionaries(@GetUser() user: User) {
    return this.dictionaryService.getAllDictionaries(user);
  }

  @UseGuards(JwtOpenGuard)
  @Get('/search')
  searchDictionary(@Query('therm') therm: string, @GetUser() user: User) {
    return this.dictionaryService.searchDictionary(therm, user, true);
  }

  @UseGuards(JwtOpenGuard)
  @Get('/public')
  getAllPublicDictionaries(
    @GetUser() user: User,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.dictionaryService.getAllPublicDictionaries(page, limit, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findOneDictionary(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.dictionaryService.findOneDictionary(id, user);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  deleteDictionary(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.dictionaryService.deleteDictionary(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/status')
  changePrivacy(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.dictionaryService.changePrivacy(id, user);
  }
}

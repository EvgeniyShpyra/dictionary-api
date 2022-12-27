import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { Repository } from 'typeorm';
import { CreateWordDto } from './dto/createWordDto';
import { User } from '../user/entities/user.entity';
import { DictionaryService } from '../dictionary/dictionary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Injectable()
@UseGuards(JwtAuthGuard)
export class WordService {
  constructor(
    @InjectRepository(Word) private wordRepository: Repository<Word>,
    private dictionaryService: DictionaryService,
  ) {}

  async getAllWords(dictionaryId: number, user: User) {
    const dictionary = await this.findDictionary(dictionaryId, user);
    return this.wordRepository.find({
      where: {
        dictionary,
        user,
      },
    });
  }
  async getWord(wordId: number, user: User) {
    const word = await this.wordRepository.findOne({
      where: { id: wordId, user },
      relations: ['dictionary'],
    });
    if (!word) {
      throw new BadRequestException('No such word');
    }
    return word;
  }
  async createWord(createWordDto: CreateWordDto, user: User) {
    const dictionary = await this.findDictionary(
      createWordDto.dictionary,
      user,
    );
    const word = await this.wordRepository.save({
      name: createWordDto.name,
      translation: createWordDto.translation,
      dictionary,
      user,
    });
    delete word.user;
    return word;
  }
  updateWord() {}
  deleteWord() {}
  searchWord() {}

  private async findDictionary(dictionaryId, user: User) {
    return this.dictionaryService.findOneDictionary(dictionaryId, user);
  }
}

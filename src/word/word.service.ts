import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { ILike, Repository } from 'typeorm';
import { CreateWordDto } from './dto/create-word.dto';
import { User } from '../user/entities/user.entity';
import { DictionaryService } from '../dictionary/dictionary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateWordDto } from './dto/update-word.dto';

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

  async createWord(
    dictionaryId: number,
    createWordDto: CreateWordDto,
    user: User,
  ) {
    const dictionary = await this.findDictionary(dictionaryId, user);
    const word = await this.wordRepository.save({
      name: createWordDto.name,
      translation: createWordDto.translation,
      dictionary,
      user,
    });
    delete word.dictionary;
    delete word.user;
    return word;
  }

  async updateWord(wordId: number, updateWordDto: UpdateWordDto, user: User) {
    const word = await this.findWord(wordId, user);
    return this.wordRepository.save({ ...word, ...updateWordDto });
  }

  async deleteWord(wordId: number, user: User) {
    const word = await this.findWord(wordId, user);
    await this.wordRepository.delete(word);
    return { success: true };
  }

  async searchWord(therm: string, user: User) {
    const word = await this.wordRepository.findOne({
      where: [
        { name: ILike(`${therm}`), user },
        { translation: ILike(`${therm}`), user },
      ],
    });
    if (!word) {
      throw new BadRequestException('No such word');
    }
    return word;
  }

  async copyDictionary(dictionaryId: number, user: User) {
    const dict = await this.dictionaryService.findPublicDictionary(
      dictionaryId,
    );
    const newDict = await this.dictionaryService.createDictionary(
      {
        name: dict.name,
      },
      user,
    );
    const words = dict.words.map((word) =>
      this.wordRepository.create({
        name: word.name,
        translation: word.translation,
        dictionary: newDict,
        user,
      }),
    );
    return this.wordRepository.save(words);
  }

  private async findDictionary(dictionaryId, user: User) {
    return this.dictionaryService.findOneDictionary(dictionaryId, user);
  }

  private async findWord(wordId: number, user: User) {
    const word = await this.wordRepository.findOne({
      where: {
        id: wordId,
        user,
      },
    });
    if (!word) {
      throw new BadRequestException('No such word');
    }
    return word;
  }
}

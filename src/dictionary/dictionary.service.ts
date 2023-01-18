import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary } from './entity/dictionary.entity';
import { Repository } from 'typeorm';
import { DictionaryDto } from './dto/dictionary.dto';
import { User } from '../user/entities/user.entity';
import { DICTIONARY_NOT_FOUND } from './dictionary.constants';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(Dictionary)
    private readonly dictionaryRepository: Repository<Dictionary>,
  ) {}

  async createDictionary(dictionaryDto: DictionaryDto, user: User) {
    const dictionary = this.dictionaryRepository.create({
      name: dictionaryDto.name,
      isPublic: dictionaryDto.isPublic,
      user,
    });
    return this.dictionaryRepository.save(dictionary);
  }

  async getAllDictionaries(user: User) {
    const dict = await this.dictionaryRepository.find({
      where: { user },
      relations: ['words'],
    });

    return dict.map((dictionary) => ({
      ...dictionary,
      learned: dictionary.words.filter((word) => word.isLearned).length,
      total: dictionary.words.length,
    }));
  }

  async findOneDictionary(dictionaryId: number, user: User) {
    const dict = await this.dictionaryRepository.findOne({
      where: {
        id: dictionaryId,
        user,
      },
      relations: ['words'],
    });
    if (!dict) {
      throw new NotFoundException(DICTIONARY_NOT_FOUND);
    }

    return dict;
  }

  async updateSingleDictionary(
    dictionaryId: number,
    dictionaryDto: DictionaryDto,
    user: User,
  ) {
    const dict = await this.findOneDictionary(dictionaryId, user);
    dict.name = dictionaryDto.name;
    return this.dictionaryRepository.save(dict);
  }

  async deleteDictionary(dictionaryId: number, user: User) {
    const dict = await this.findOneDictionary(dictionaryId, user);
    await this.dictionaryRepository.remove(dict);
    return { success: true };
  }

  async changePrivacy(dictionaryId: number, user: User) {
    const dict = await this.findOneDictionary(dictionaryId, user);
    dict.isPublic = !dict.isPublic;
    return this.dictionaryRepository.save(dict);
  }

  async getAllPublicDictionaries() {
    return this.dictionaryRepository.find({
      where: {
        isPublic: true,
      },
      relations: ['words'],
    });
  }

  async findPublicDictionary(dictionaryId) {
    const dict = await this.dictionaryRepository.findOne({
      where: {
        isPublic: true,
        id: dictionaryId,
      },
      relations: ['words'],
    });
    if (!dict) {
      throw new NotFoundException(DICTIONARY_NOT_FOUND);
    }
    return dict;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary } from './entity/dictionary.entity';
import { Repository } from 'typeorm';
import { DictionaryDto } from './dto/dictionary.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(Dictionary)
    private readonly dictionaryRepository: Repository<Dictionary>,
  ) {}

  async createDictionary(dictionaryDto: DictionaryDto, user: User) {
    const dictionary = this.dictionaryRepository.create({
      name: dictionaryDto.name,
      user,
    });
    return this.dictionaryRepository.save(dictionary);
  }

  async getAllDictionaries(user: User) {
    return this.dictionaryRepository
      .find({
        where: { user },
        relations: ['words'],
      })
      .then((dict) =>
        dict.map((item) => ({
          item,
          count: item.words.length,
          learned: item.words.filter((word) => word.isLearned).length,
        })),
      );
  }

  async findOneDictionary(dictionaryId: number, user: User) {
    const dict = await this.dictionaryRepository.findOne({
      where: {
        user,
        id: dictionaryId,
      },
      relations: ['words'],
    });
    if (!dict) {
      throw new NotFoundException('Dictionary not found');
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
    await this.dictionaryRepository.delete(dict);
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
}

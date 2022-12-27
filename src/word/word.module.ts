import { Module } from '@nestjs/common';
import { WordController } from './word.controller';
import { WordService } from './word.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { DictionaryModule } from '../dictionary/dictionary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Word]), DictionaryModule],
  controllers: [WordController],
  providers: [WordService],
})
export class WordModule {}

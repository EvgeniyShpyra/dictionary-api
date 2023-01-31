import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VirtualColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Word } from '../../word/entities/word.entity';

@Entity()
export class Dictionary {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  name: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ default: false })
  isPublic: boolean;
  @ManyToOne(() => User, (user) => user.dictionaries)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Word, (word) => word.dictionary)
  words: Word[];

  @VirtualColumn({
    query: (alias) =>
      `SELECT COUNT("name") FROM "word" WHERE "dictionary_id" = ${alias}.id`,
  })
  total: number;

  @VirtualColumn({
    query: (alias) =>
      `SELECT COUNT("name") FROM "word" WHERE "dictionary_id" = ${alias}.id and "isLearned"= true`,
  })
  learned: number;
}

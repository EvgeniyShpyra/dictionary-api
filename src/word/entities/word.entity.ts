import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Dictionary } from '../../dictionary/entity/dictionary.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  name: string;
  @Column()
  translation: string;
  @Column({ default: false })
  isLearned: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => Dictionary, (dictionary) => dictionary.words, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'dictionary_id', referencedColumnName: 'id' })
  dictionary: Dictionary;

  @ManyToOne(() => User, (user) => user.words)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}

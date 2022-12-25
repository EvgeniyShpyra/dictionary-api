import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dictionary } from '../../dictionary/entity/dictionary.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  username: string;
  @Column('text', { unique: true })
  email: string;
  @Column('text')
  password: string;
  @Column('boolean', { default: false })
  isConfirmed: boolean;
  @Column({ nullable: true, default: Date.now(), name: 'created_at' })
  createdAt?: string;
  @OneToMany(() => Dictionary, (dictionary) => dictionary.user, {
    cascade: true,
  })
  dictionaries: Dictionary[];
}

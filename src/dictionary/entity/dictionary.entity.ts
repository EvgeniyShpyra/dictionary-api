import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Dictionary {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  name: string;
  @Column({ default: Date.now(), name: 'created_at', nullable: true })
  createdAt: string;
  @Column({ default: false })
  isPublic: boolean;
  @ManyToOne(() => User, (user) => user.dictionaries)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}

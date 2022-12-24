import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

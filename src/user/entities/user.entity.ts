import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  username: string;
  @Column('text')
  email: string;
  @Column('boolean', { default: false })
  isConfirmed: boolean;
}

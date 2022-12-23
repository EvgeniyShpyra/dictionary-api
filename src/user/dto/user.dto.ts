import { User } from '../entities/user.entity';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto extends User {
  @IsString()
  username: string;
  @IsEmail()
  email: string;
}

import { IsEmail, IsString, Matches } from 'class-validator';

export class SignupUserDto {
  @IsString()
  username: string;
  @IsEmail()
  email: string;
  @Matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{5,})\S$/, {
    message: 'Password is too weak',
  })
  @IsString()
  password: string;
}

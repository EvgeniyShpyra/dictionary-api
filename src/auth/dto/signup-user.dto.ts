import { IsEmail, IsString, Matches } from 'class-validator';

export class SignupUserDto {
  @IsString()
  username: string;
  @IsEmail()
  email: string;
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {
    message: 'Password is too weak',
  })
  @IsString()
  password: string;
}

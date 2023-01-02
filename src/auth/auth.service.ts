import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { genSalt, hash } from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpUserDto: SignupUserDto) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(signUpUserDto.password, salt);
    return this.userService.createUser({
      ...signUpUserDto,
      password: hashedPassword,
    });
  }
  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.validateUser(loginUserDto);
    const payload = { email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      isConfirmed: user.isConfirmed,
    };
  }
}

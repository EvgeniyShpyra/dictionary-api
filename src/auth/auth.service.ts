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

    const user = await this.userService.createUser({
      ...signUpUserDto,
      password: hashedPassword,
    });
    delete user.password;
    delete user.isConfirmed;
    return {
      access_token: await this.signPassword({ email: signUpUserDto.email }),
      ...user,
    };
  }
  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.validateUser(loginUserDto);
    const payload = { email: user.email };
    delete user.password;
    delete user.isConfirmed;
    return {
      access_token: await this.signPassword(payload),
      ...user,
    };
  }

  private async signPassword(payload: { email: string }) {
    return this.jwtService.signAsync(payload);
  }
}

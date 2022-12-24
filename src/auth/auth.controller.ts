import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() signUpUserDto: SignupUserDto) {
    return this.authService.signUp(signUpUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}

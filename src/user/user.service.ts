import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/user.dto';
import { compare } from 'bcryptjs';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import {
  USER_ALREADY_EXISTS_ERROR,
  USER_NOT_EXIST_ERROR,
} from '../auth/constants/auth.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUser(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(USER_NOT_EXIST_ERROR);
    }
    delete user.password;
    return user;
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<CreateUserDto, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException(USER_ALREADY_EXISTS_ERROR);
    }
    await this.userRepository.save(createUserDto);
    delete createUserDto.password;
    return createUserDto;
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new BadRequestException(USER_NOT_EXIST_ERROR);
    }
    await this.userRepository.remove(user);
    return { success: true };
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new BadRequestException(USER_NOT_EXIST_ERROR);
    }
    const isPasswordValid = await compare(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect user credentials');
    }
    return user;
  }
}

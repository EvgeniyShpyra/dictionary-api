import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
  async getAllUsers() {
    return this.userRepository.find();
  }
  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }
  async updateUser() {}
}

import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/userinfo')
  getUser(@GetUser() user: User) {
    return this.userService.findUser(user.email);
  }

  @Get('/userstatus/:id')
  changeUser(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.userStatus(userId);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}

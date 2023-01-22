import { Controller, Body, Post } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: UserDto): Promise<User> {
    return this.userService.createUser(data);
  }
}

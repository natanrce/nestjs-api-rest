import { User } from '@prisma/client';
import { Controller, Body, Post, Put, Param } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: UserDto): Promise<User> {
    return this.userService.create(data);
  }

  @Put(':id')
  async updateUser(
    @Body() data: UserDto,
    @Param('id') id: string,
  ): Promise<User> {
    return this.userService.update(id, data);
  }
}

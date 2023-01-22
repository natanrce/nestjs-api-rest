import { User } from '@prisma/client';

import {
  Controller,
  Body,
  Post,
  Put,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';

import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<UserDto> {
    return this.userService.create(data);
  }

  @Put(':id')
  async updateUser(
    @Body() data: CreateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    return this.userService.update(id, data);
  }
}

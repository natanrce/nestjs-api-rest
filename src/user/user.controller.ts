import { User } from '@prisma/client';
import {
  Controller,
  Body,
  Post,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

import { UserDto } from './dto/user.dto';
import { CurrentUser } from './user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { IsAuthorGuard } from './guards/author.guard';

import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserDto) {
    return this.authService.login(user);
  }

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<UserDto> {
    return this.userService.create(data);
  }

  @UseGuards(IsAuthorGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Body() data: CreateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    return this.userService.update(id, data);
  }

  @UseGuards(IsAuthorGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async destroyUser(@Param('id') id: string) {
    return this.userService.destroy(id);
  }
}

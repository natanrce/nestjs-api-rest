import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

import { PrismaService } from 'src/prisma';

const userSelects = {
  id: true,
  email: true,
  password: false,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserDto> {
    return this.prisma.user.create({
      data,
      select: userSelects,
    });
  }

  async findOne(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: CreateUserDto): Promise<User> {
    return this.prisma.user.update({
      data,
      where: { id },
      select: userSelects,
    });
  }
}

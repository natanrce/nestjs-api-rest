import { User } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';

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

  async findOneOrFail(email: string): Promise<User> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { email },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data: CreateUserDto): Promise<User> {
    return this.prisma.user.update({
      data,
      where: { id },
      select: userSelects,
    });
  }

  async destroy(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: string, data: UserDto): Promise<User> {
    return this.prisma.user.update({
      data,
      where: { id },
    });
  }
}

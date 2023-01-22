import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: UserDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}

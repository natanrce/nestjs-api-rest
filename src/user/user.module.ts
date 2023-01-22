import { Module, forwardRef } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

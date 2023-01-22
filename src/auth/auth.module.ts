import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategys/local.strategy';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}

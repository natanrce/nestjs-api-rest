import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}

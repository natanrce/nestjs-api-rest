import { IsEmail, Matches } from 'class-validator';
import { regexHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Matches(regexHelper.password, {
    message:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number.',
  })
  password: string;
}

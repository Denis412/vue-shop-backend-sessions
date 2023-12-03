import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string) {
    try {
      const targetUser = await this.userService.findOneByUsername(username);

      if (!(await bcrypt.compare(password, targetUser.password))) {
        throw new UnauthorizedException('Неверный пароль');
      }

      return {
        user_id: targetUser.id,
        username: targetUser.username,
      };
    } catch (error) {
      throw new UnauthorizedException('Пользователь не найден');
    }
  }
}

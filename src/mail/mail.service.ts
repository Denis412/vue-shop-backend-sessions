import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserOrderInformation(user: User, email: string) {
    // const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email || email,
      from: '"Coffee shop" <denis3674@bk.ru>', // override default from
      subject: 'Спасибо за заказ!',
      html: `<div>
      Ваш заказ создан и в ближайшее время будет обработан!
      </div>`,
      // template: './createOrder', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.username,
      },
    });
  }
}

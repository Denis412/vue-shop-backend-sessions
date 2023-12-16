import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

import path from 'path';
import * as nodemailer from 'nodemailer';
import * as nodemailerHbs from 'nodemailer-express-handlebars';
import * as exphbs from 'express-handlebars';
import { template } from 'handlebars';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserOrderInformation(user: User, email: string, order: Order) {
    // const url = `example.com/auth/confirm?token=${token}`;

    // MailerModule.forRoot({
    //   transport: {
    //     host: 'smtp.mail.ru',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //       user: 'denis3674@bk.ru',
    //       pass: 'uPj2j9yL4V49tKJ0Pr2p',
    //     },
    //   },
    //   defaults: {
    //     from: '"Coffee shop" <denis3674@bk.ru>',
    //   },
    //   template: {
    //     // dir: process.cwd() + '/templates/',
    //     dir: __dirname + '/templates',
    //     adapter: new HandlebarsAdapter(),
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),

    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'denis3674@bk.ru',
        pass: 'uPj2j9yL4V49tKJ0Pr2p',
      },
    });

    const handlebarsOptions = {
      viewEngine: {
        extName: '.hbs',
        layoutsDir: 'src/mail/templates',
        defaultLayout: 'createOrder.hbs',
      },
      viewPath: 'src/mail/templates',
      extName: '.hbs',
    };

    transporter.use('compile', nodemailerHbs(handlebarsOptions));

    console.log('order', order);
    const mailOptions = {
      to: user.email || email,
      from: '"Coffee shop" <denis3674@bk.ru>', // override default from
      subject: 'Спасибо за заказ!',
      template: 'createOrder',
      context: {
        products: order.products.map((pr) => ({
          ...pr.product,
          count: pr.count,
        })),
        discount: order.coupon?.discount,
        price: order.products.reduce((sum, pr) => {
          return sum + pr.product.price * pr.count;
        }, 0),
        discountPrice: order.price,
        num: order.num,
      },
    };

    await transporter.sendMail(mailOptions);

    // await this.mailerService.sendMail({
    //   to: user.email || email,
    //   from: '"Coffee shop" <denis3674@bk.ru>', // override default from
    //   subject: 'Спасибо за заказ!',
    //   html: `<div>
    //   Ваш заказ создан и в ближайшее время будет обработан!
    //   </div>`,
    //   // template: './createOrder', // `.hbs` extension is appended automatically
    //   context: {
    //     // ✏️ filling curly brackets with content
    //     name: user.username,
    //   },
    // });
  }
}

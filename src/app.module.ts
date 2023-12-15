import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { ProductInCartModule } from './product-in-cart/product-in-cart.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailModule } from './mail/mail.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductInOrderModule } from './product-in-order/product-in-order.module';
import { MulterModule } from '@nestjs/platform-express';
import { CouponModule } from './coupon/coupon.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
          user: 'denis3674@bk.ru',
          pass: 'uPj2j9yL4V49tKJ0Pr2p',
        },
      },
      defaults: {
        from: '"Coffee shop" <denis3674@bk.ru>',
      },
      template: {
        // dir: process.cwd() + '/templates/',
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    CartModule,
    ProductModule,
    ProductInCartModule,
    UserModule,
    OrderModule,
    AuthModule,
    MailModule,
    ProductCategoryModule,
    ProductInOrderModule,
    CouponModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

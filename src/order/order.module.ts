import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { MailModule } from 'src/mail/mail.module';
import { ProductInOrderModule } from 'src/product-in-order/product-in-order.module';
import { ProductInCartModule } from 'src/product-in-cart/product-in-cart.module';
import { CouponModule } from 'src/coupon/coupon.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UserModule,
    ProductModule,
    MailModule,
    ProductInOrderModule,
    ProductInCartModule,
    CouponModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { ProductInCartService } from './product-in-cart.service';
import { ProductInCartController } from './product-in-cart.controller';

@Module({
  controllers: [ProductInCartController],
  providers: [ProductInCartService],
})
export class ProductInCartModule {}

import { Module } from '@nestjs/common';
import { ProductInCartService } from './product-in-cart.service';
import { ProductInCartController } from './product-in-cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInCart } from './entities/product-in-cart.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductInCart]),
    UserModule,
    ProductModule,
  ],
  controllers: [ProductInCartController],
  providers: [ProductInCartService],
  exports: [ProductInCartService],
})
export class ProductInCartModule {}

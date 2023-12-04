import { Module } from '@nestjs/common';
import { ProductInOrderService } from './product-in-order.service';
import { ProductInOrderController } from './product-in-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInOrder } from './entities/product-in-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductInOrder])],
  controllers: [ProductInOrderController],
  providers: [ProductInOrderService],
  exports: [ProductInOrderService],
})
export class ProductInOrderModule {}

import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { generateId } from 'src/helpers/generate-id.helper';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { MailService } from 'src/mail/mail.service';
import { ProductInOrderService } from 'src/product-in-order/product-in-order.service';
import { ProductInCartService } from 'src/product-in-cart/product-in-cart.service';
import { CouponService } from 'src/coupon/coupon.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly repository: Repository<Order>,
    private readonly userService: UserService,
    private readonly couponService: CouponService,
    private readonly productService: ProductService,
    private readonly mailService: MailService,
    private readonly productInCartService: ProductInCartService,
    private readonly productInOrderService: ProductInOrderService,
  ) {}

  async create(input: CreateOrderDto, @Request() req) {
    const targetAuthor = await this.userService.findOneById(req.user?.user_id);
    const targetCoupon = await this.couponService.findOneByID(
      input.coupon?.objectId,
    );

    console.log('coupon', input, targetCoupon);
    const targetProducts = [];

    if (!targetAuthor) {
      throw new NotFoundException(
        `Пользователь с id ${req.user?.user_id} не найден`,
      );
    }

    if (input.coupon && !targetCoupon) {
      throw new NotFoundException('Купон не найден!');
    }

    if (!input.products?.length) {
      throw new NotFoundException(`Не передано обязательное поле products`);
    }
    for (const index in input.products) {
      const product = await this.productInCartService.findOne(
        input.products[index].objectId,
      );

      if (!product) {
        throw new NotFoundException(
          `Товар с id ${input.products[index].objectId} не найден`,
        );
      }

      targetProducts.push(product);
    }

    for (const index in targetProducts) {
      await this.productInOrderService.create({
        product: targetProducts[index].product,
        count: targetProducts[index].count,
      });

      await this.productInCartService.remove(targetProducts[index].id);
    }

    const createdOrder = await this.repository.save({
      id: generateId(),
      price: input.price,
      author: targetAuthor,
      email: targetAuthor.email ?? input.email,
      products: targetProducts,
      coupon: targetCoupon,
    });

    await this.mailService.sendUserOrderInformation(
      targetAuthor,
      input.email,
      createdOrder,
    );

    return createdOrder;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  update(id: string, input: UpdateOrderDto) {
    // return this.repository.save({ id, ...input });
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}

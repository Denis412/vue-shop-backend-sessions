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

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly repository: Repository<Order>,
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly mailService: MailService,
  ) {}

  async create(input: CreateOrderDto, @Request() req) {
    const targetAuthor = await this.userService.findOneById(req.user?.user_id);
    const targetProducts = [];

    if (!targetAuthor) {
      throw new NotFoundException(
        `Пользователь с id ${req.user?.user_id} не найден`,
      );
    }

    for (const index in input.products) {
      const product = await this.productService.findOne(
        input.products[index].objectId,
      );

      if (!product) {
        throw new NotFoundException(
          `Товар с id ${input.products[index].objectId} не найден`,
        );
      }

      targetProducts.push(product);
    }

    const createdOrder = await this.repository.save({
      id: generateId(),
      author: targetAuthor,
      email: targetAuthor.email,
      products: targetProducts,
    });

    // await this.mailService.sendUserOrderInformation(targetAuthor, input.email);

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

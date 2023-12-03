import { BadRequestException, Injectable, Request } from '@nestjs/common';
import { CreateProductInCartDto } from './dto/create-product-in-cart.dto';
import { UpdateProductInCartDto } from './dto/update-product-in-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductInCart } from './entities/product-in-cart.entity';
import { Repository } from 'typeorm';
import { generateId } from 'src/helpers/generate-id.helper';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductInCartService {
  constructor(
    @InjectRepository(ProductInCart)
    private readonly repository: Repository<ProductInCart>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async create(input: CreateProductInCartDto, @Request() req) {
    const targetProduct = await this.productService.findOne(
      input.product?.objectId,
    );

    if (!targetProduct) {
      throw new BadRequestException(
        `Товар с id ${input.product?.objectId} не найден`,
      );
    }

    const targetUser = await this.userService.findOneById(req.user?.user_id);

    if (!targetUser) {
      throw new BadRequestException(
        `Пользователь с id ${req.user?.user_id} не найден`,
      );
    }

    return this.repository.save({
      id: generateId(),
      product: targetProduct,
      user: targetUser,
    });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  update(id: string, updateProductInCartDto: UpdateProductInCartDto) {
    return `This action updates a #${id} productInCart`;
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}

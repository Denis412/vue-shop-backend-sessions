import { BadRequestException, Injectable, Request } from '@nestjs/common';
import { CreateProductInCartDto } from './dto/create-product-in-cart.dto';
import { UpdateProductInCartDto } from './dto/update-product-in-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductInCart } from './entities/product-in-cart.entity';
import { Repository } from 'typeorm';
import { generateId } from 'src/helpers/generate-id.helper';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import getPaginatorResults from '../pagination/pagination';
import Pagination from 'src/pagination/pagination.type';
import { PaginatorWhereOperator } from 'src/types/paginator-where-operator';

@Injectable()
export class ProductInCartService {
  constructor(
    @InjectRepository(ProductInCart)
    private readonly repository: Repository<ProductInCart>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async createMany(input: CreateProductInCartDto[], @Request() req) {
    const productsInCart = [];
    for (const index in input) {
      productsInCart.push(await this.create(input[index], req));
    }

    return productsInCart;
  }

  async create(input: CreateProductInCartDto, @Request() req) {
    if (!req.user) {
      return {};
    }
    const targetProduct = await this.productService.findOne(
      input.product?.objectId,
    );

    if (!targetProduct) {
      throw new BadRequestException(
        `Товар с id ${input.product?.objectId} не найден`,
      );
    }

    if (!input.count) {
      const { data: productsInCart, ...rest } = await this.findWithWhere({
        and: [
          {
            column: 'product.id',
            operator: 'EQ',
            value: targetProduct.id,
          },
          {
            column: 'user.id',
            operator: 'EQ',
            value: req.user?.user_id,
          },
        ],
      });

      if (productsInCart.length) {
        return await this.update(productsInCart[0].id, {
          count: productsInCart[0].count + 1,
        });
      }
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
      count: input.count,
    });
  }

  findAll(body: Pagination) {
    return getPaginatorResults<ProductInCart>(
      this.repository,
      body.page,
      body.perPage,
      body.where,
      body.orderBy,
      'product_in_cart',
    );
  }

  findMy(body: Pagination, @Request() req) {
    console.log('req', req);
    return getPaginatorResults<ProductInCart>(
      this.repository,
      body.page,
      body.perPage,
      {
        column: 'user.id',
        operator: PaginatorWhereOperator.EQ,
        value: req.user?.user_id,
      },
      body.orderBy,
      'product_in_cart',
    );
  }

  findWithWhere(where) {
    return getPaginatorResults<ProductInCart>(
      this.repository,
      1,
      100,
      where,
      null,
      'product_in_cart',
    );
  }

  async findOne(id: string) {
    const products = await this.repository.find({
      where: {
        id: id,
      },
      relations: {
        product: true,
      },
    });

    return products[0];
  }

  update(id: string, input: UpdateProductInCartDto) {
    return this.repository.save({ id, ...input });
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}

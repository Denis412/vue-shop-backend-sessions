import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { generateId } from 'src/helpers/generate-id.helper';
import { UserService } from 'src/user/user.service';
import { ProductCategoryService } from 'src/product-category/product-category.service';
import getPaginatorResults from 'src/pagination/pagination';
import Pagination from 'src/pagination/pagination.type';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly repository: Repository<Product>,
    private readonly userService: UserService,
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  async create(input: CreateProductDto, @Request() req) {
    if (!input.category?.objectId) {
      throw new NotFoundException(
        `Категория с id ${input.category?.objectId} не найдена`,
      );
    }

    const targetUser = await this.userService.findOneById(req.user?.user_id);
    const targetCategory = await this.productCategoryService.findOne(
      input.category?.objectId,
    );

    if (!targetCategory) {
      throw new NotFoundException(
        `Категория с id ${input.category?.objectId} не найдена`,
      );
    }

    return this.repository.save({
      id: generateId(),
      ...input,
      author: targetUser,
      category: targetCategory,
    });
  }

  async findAll(body: Pagination) {
    console.log(
      'res',
      await getPaginatorResults<Product>(
        this.repository,
        body.page,
        body.perPage,
        body.where,
        body.orderBy,
        'product',
      ),
    );
    return await getPaginatorResults<Product>(
      this.repository,
      body.page,
      body.perPage,
      body.where,
      body.orderBy,
      'product',
    );
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  update(id: string, input: UpdateProductDto) {
    return this.repository.save({ id, ...input });
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}

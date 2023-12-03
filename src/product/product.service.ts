import { Injectable, Request } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { generateId } from 'src/helpers/generate-id.helper';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly repository: Repository<Product>,
    private readonly userService: UserService,
  ) {}

  async create(input: CreateProductDto, @Request() req) {
    const targetUser = await this.userService.findOneById(req.user?.user_id);

    return this.repository.save({
      id: generateId(),
      ...input,
      author: targetUser,
    });
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}

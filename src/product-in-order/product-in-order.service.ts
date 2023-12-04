import { Injectable } from '@nestjs/common';
import { CreateProductInOrderDto } from './dto/create-product-in-order.dto';
import { UpdateProductInOrderDto } from './dto/update-product-in-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductInOrder } from './entities/product-in-order.entity';
import { Repository } from 'typeorm';
import { generateId } from 'src/helpers/generate-id.helper';

@Injectable()
export class ProductInOrderService {
  constructor(
    @InjectRepository(ProductInOrder)
    private readonly repository: Repository<ProductInOrder>,
  ) {}

  create(input: CreateProductInOrderDto) {
    return this.repository.save({ id: generateId(), ...input });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  update(id: string, updateProductInOrderDto: UpdateProductInOrderDto) {
    return `This action updates a #${id} productInOrder`;
  }

  remove(id: string) {
    return `This action removes a #${id} productInOrder`;
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductInOrderService } from './product-in-order.service';
import { CreateProductInOrderDto } from './dto/create-product-in-order.dto';
import { UpdateProductInOrderDto } from './dto/update-product-in-order.dto';

@Controller('product-in-order')
export class ProductInOrderController {
  constructor(private readonly productInOrderService: ProductInOrderService) {}

  @Post()
  create(@Body() createProductInOrderDto: CreateProductInOrderDto) {
    return this.productInOrderService.create(createProductInOrderDto);
  }

  @Get()
  findAll() {
    return this.productInOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productInOrderService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductInOrderDto: UpdateProductInOrderDto,
  ) {
    return this.productInOrderService.update(id, updateProductInOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productInOrderService.remove(id);
  }
}

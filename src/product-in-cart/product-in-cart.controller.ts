import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ProductInCartService } from './product-in-cart.service';
import { CreateProductInCartDto } from './dto/create-product-in-cart.dto';
import { UpdateProductInCartDto } from './dto/update-product-in-cart.dto';

@Controller('product-in-cart')
export class ProductInCartController {
  constructor(private readonly productInCartService: ProductInCartService) {}

  @Post()
  create(@Body() input: CreateProductInCartDto, @Request() req) {
    return this.productInCartService.create(input, req);
  }

  @Get()
  findAll() {
    return this.productInCartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productInCartService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductInCartDto: UpdateProductInCartDto,
  ) {
    return this.productInCartService.update(id, updateProductInCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productInCartService.remove(id);
  }
}

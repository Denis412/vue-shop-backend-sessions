import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductInCartService } from './product-in-cart.service';
import { CreateProductInCartDto } from './dto/create-product-in-cart.dto';
import { UpdateProductInCartDto } from './dto/update-product-in-cart.dto';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import Pagination from 'src/pagination/pagination.type';

@Controller('product-in-cart')
export class ProductInCartController {
  constructor(private readonly productInCartService: ProductInCartService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Body() input: CreateProductInCartDto, @Request() req) {
    console.log('session', req.session, req.session.id, req.user);
    return this.productInCartService.create(input, req);
  }

  // @UseGuards(AuthenticatedGuard)
  @Post('many')
  createMany(@Body() input: CreateProductInCartDto[], @Request() req) {
    return this.productInCartService.createMany(input, req);
  }

  @Post('/all')
  findAll(@Body() body: Pagination) {
    return this.productInCartService.findAll(body);
  }

  @Post('/my')
  findMy(@Body() body: Pagination, @Request() req) {
    return this.productInCartService.findMy(body, req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productInCartService.findOne(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductInCartDto: UpdateProductInCartDto,
  ) {
    return this.productInCartService.update(id, updateProductInCartDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productInCartService.remove(id);
  }
}

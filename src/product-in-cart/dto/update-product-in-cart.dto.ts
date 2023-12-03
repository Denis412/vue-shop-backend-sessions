import { PartialType } from '@nestjs/mapped-types';
import { CreateProductInCartDto } from './create-product-in-cart.dto';

export class UpdateProductInCartDto extends PartialType(CreateProductInCartDto) {}

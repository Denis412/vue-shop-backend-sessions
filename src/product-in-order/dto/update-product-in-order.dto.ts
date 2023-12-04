import { PartialType } from '@nestjs/mapped-types';
import { CreateProductInOrderDto } from './create-product-in-order.dto';

export class UpdateProductInOrderDto extends PartialType(CreateProductInOrderDto) {}

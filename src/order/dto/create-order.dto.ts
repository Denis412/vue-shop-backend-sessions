import { RelationType } from 'src/types/relation.type';

export class CreateOrderDto {
  email: string;
  products: RelationType[];
  author: RelationType;
  coupon: RelationType;
  price: number;
}

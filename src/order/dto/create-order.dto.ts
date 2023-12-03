import { RelationType } from 'src/types/relation.type';

export class CreateOrderDto {
  products: RelationType[];
  author: RelationType;
}

import { RelationType } from 'src/types/relation.type';

export class CreateProductInCartDto {
  product: RelationType;
  user: RelationType;
}

import { RelationType } from 'src/types/relation.type';

export class CreateProductDto {
  label: string;
  image: string;
  description: string;
  price: number;
  type: number;
  author: RelationType;
}

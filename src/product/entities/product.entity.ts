import { ProductCategory } from 'src/product-category/entities/product-category.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  label: string;

  @Column()
  label_en: string;

  @Column({ type: 'int', default: 1 })
  type: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  price: number;

  @Column()
  image: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({
    name: 'author_id',
    referencedColumnName: 'id',
  })
  author: User;

  @ManyToOne(() => ProductCategory, { nullable: false })
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
  })
  category: ProductCategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

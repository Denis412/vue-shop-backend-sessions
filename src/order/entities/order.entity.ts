import { ProductInCart } from 'src/product-in-cart/entities/product-in-cart.entity';
import { ProductInOrder } from 'src/product-in-order/entities/product-in-order.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryColumn()
  id: string;

  //   @Column()
  //   title: string;

  //   @Column()
  //   description: string;

  @Column()
  email: string;

  @OneToMany(() => ProductInOrder, (product) => product.order)
  products: ProductInOrder[];

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({
    name: 'author_id',
    referencedColumnName: 'id',
  })
  author: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

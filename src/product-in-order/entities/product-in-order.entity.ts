import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
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
export class ProductInOrder {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product: Product;

  @ManyToOne(() => Order, (order) => order.products)
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id',
  })
  order: Order;

  @Column({ nullable: false, default: 1, type: 'int' })
  count: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

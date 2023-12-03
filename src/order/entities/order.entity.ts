import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @ManyToMany(() => Product, { nullable: false })
  @JoinTable()
  products: Product[];

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

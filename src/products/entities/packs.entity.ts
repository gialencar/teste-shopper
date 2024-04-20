import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('packs')
export class Pack {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: false })
  qty: number;

  @ManyToOne(() => Product, (product) => product.packs, {
    nullable: false,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Product, (product) => product.packs, {
    nullable: false,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'pack_id' })
  pack: Product;
}

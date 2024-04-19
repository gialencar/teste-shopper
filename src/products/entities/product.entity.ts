import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  code: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'decimal', precision: 9, scale: 2, nullable: false })
  cost_price: number;

  @Column({ type: 'decimal', precision: 9, scale: 2, nullable: false })
  sales_price: number;
}

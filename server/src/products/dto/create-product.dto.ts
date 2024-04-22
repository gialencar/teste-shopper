import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  code: number;
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly cost_price: number;
  @IsNotEmpty()
  readonly sales_price: number;
}

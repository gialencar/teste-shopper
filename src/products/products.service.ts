import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(code: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ code });
    if (!product) {
      throw new NotFoundException(`Produto com código ${code} não encontrado`);
    }
    return product;
  }

  async update(
    code: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOneBy({ code });

    if (+updateProductDto.new_price < product.cost_price) {
      throw new BadRequestException(
        'Novo preço não pode ser menor que o preço de custo',
      );
    }

    if (
      +updateProductDto.new_price > product.sales_price * 1.1 ||
      +updateProductDto.new_price < product.sales_price * 0.9
    ) {
      throw new BadRequestException(
        'Alteração do preço não pode ser maior ou menor que 10% do preço atual',
      );
    }

    product.sales_price = +updateProductDto.new_price;

    return this.productRepository.save(product);
  }

  remove(code: number): Promise<DeleteResult> {
    return this.productRepository.delete({ code });
  }
}

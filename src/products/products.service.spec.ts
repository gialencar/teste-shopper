import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockProductRepository = {
  find: jest.fn().mockResolvedValue([
    {
      code: 1,
      name: 'Test Product',
      cost_price: 10,
      sales_price: 20,
    },
  ]),
  findOneBy: jest.fn().mockResolvedValue({
    code: 1,
    name: 'Test Product',
    cost_price: 10,
    sales_price: 20,
  }),
  create: jest.fn().mockImplementation((product: Product) => product),
  save: jest
    .fn()
    .mockImplementation((product: Product) => Promise.resolve(product)),
  merge: jest
    .fn()
    .mockImplementation(
      (_product: Product, updateProductDto: Product) => updateProductDto,
    ),
};

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of products', async () => {
    const products = await service.findAll();
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThanOrEqual(1);
  });

  it('should return a product by id', async () => {
    const product = await service.findOne(1);
    expect(product).toBeDefined();
    expect(product.code).toBe(1);
    expect(product.name).toBe('Test Product');
    expect(product.cost_price).toBe(10);
    expect(product.sales_price).toBe(20);
  });

  it('should create a product', async () => {
    const product = await service.create({
      code: 42,
      name: 'Created Test Product',
      cost_price: 10,
      sales_price: 20,
    });
    expect(product).toBeDefined();
    expect(product.name).toBe('Created Test Product');
  });

  it('should update a product', async () => {
    const product = await service.update(42, {
      new_price: '19',
    });
    expect(product).toBeDefined();
    expect(product.sales_price).toBe(19);
  });
});

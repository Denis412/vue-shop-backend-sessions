import { Test, TestingModule } from '@nestjs/testing';
import { ProductInOrderService } from './product-in-order.service';

describe('ProductInOrderService', () => {
  let service: ProductInOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductInOrderService],
    }).compile();

    service = module.get<ProductInOrderService>(ProductInOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

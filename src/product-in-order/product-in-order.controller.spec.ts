import { Test, TestingModule } from '@nestjs/testing';
import { ProductInOrderController } from './product-in-order.controller';
import { ProductInOrderService } from './product-in-order.service';

describe('ProductInOrderController', () => {
  let controller: ProductInOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductInOrderController],
      providers: [ProductInOrderService],
    }).compile();

    controller = module.get<ProductInOrderController>(ProductInOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

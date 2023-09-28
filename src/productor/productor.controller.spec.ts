import { Test, TestingModule } from '@nestjs/testing';
import { ProductorController } from './productor.controller';

describe('ProductorController', () => {
  let controller: ProductorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductorController],
    }).compile();

    controller = module.get<ProductorController>(ProductorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TransformadorController } from './transformador.controller';

describe('TransformadorController', () => {
  let controller: TransformadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransformadorController],
    }).compile();

    controller = module.get<TransformadorController>(TransformadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

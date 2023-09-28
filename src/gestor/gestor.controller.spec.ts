import { Test, TestingModule } from '@nestjs/testing';
import { GestorController } from './gestor.controller';

describe('GestorController', () => {
  let controller: GestorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestorController],
    }).compile();

    controller = module.get<GestorController>(GestorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

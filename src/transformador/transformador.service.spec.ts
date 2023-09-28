import { Test, TestingModule } from '@nestjs/testing';
import { TransformadorService } from './transformador.service';

describe('TransformadorService', () => {
  let service: TransformadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformadorService],
    }).compile();

    service = module.get<TransformadorService>(TransformadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

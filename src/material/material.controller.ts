import { Controller, Get } from '@nestjs/common';
import { MaterialService } from './material.service';
import { Material } from './material.entity';
@Controller('materiales')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get()
  async getAllMaterials(): Promise<Material[]> {
    return this.materialService.getAllMaterials();
  }
}

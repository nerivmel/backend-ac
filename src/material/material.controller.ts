import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './create.material.dto';
import { ApiBody } from '@nestjs/swagger';
import { Material } from './material.entity';
@Controller('materiales')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get()
  async getAllMaterials(): Promise<Material[]> {
    return this.materialService.getAllMaterials();
  }
  @Get('gestor/:gestorId')
  async getMaterialesByGestor(@Param('gestorId') gestorId: number) {
    const materiales =
      await this.materialService.getMaterialesByGestor(gestorId);
    return materiales;
  }
  @Post()
  @ApiBody({ type: CreateMaterialDto })
  async createMaterial(@Body() createMaterialDto: CreateMaterialDto) {
    const material =
      await this.materialService.createMaterial(createMaterialDto);
    return material;
  }
}

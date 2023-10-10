// transformador.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TransformadorService } from './transformador.service';
import { Transformador } from './transformador.entity';
import { TransformadorCreateDTO } from './transformador.create.dto';

@Controller('transformador')
export class TransformadorController {
  constructor(private readonly transformadorService: TransformadorService) {}

  @Get()
  async findAll(): Promise<Transformador[]> {
    return this.transformadorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Transformador | undefined> {
    return this.transformadorService.findOne(Number(id));
  }

  @Post('/registrar')
  async create(@Body() transformadorDto: TransformadorCreateDTO) {
    return await this.transformadorService.create(transformadorDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransformadorDto: TransformadorCreateDTO,
  ): Promise<string> {
    return this.transformadorService.update(Number(id), updateTransformadorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.transformadorService.remove(Number(id));
  }
}

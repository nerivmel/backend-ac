import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { GestorService } from './gestor.service';
import { Gestor } from './gestor.entity';
import { CreateGestorDTO } from './create.gestor.dto';

@Controller('gestor')
export class GestorController {
  constructor(private readonly gestorService: GestorService) {}

  @Get()
  async findAll(): Promise<Gestor[]> {
    return this.gestorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Gestor | undefined> {
    return this.gestorService.findOne(Number(id));
  }

  @Post('/registrar')
  async create(@Body() gestorDto: CreateGestorDTO) {
    return await this.gestorService.create(gestorDto);
  }

  @Put(':id')
  async updateGestor(
    @Param('id') id: string,
    @Body() updateGestorDto: CreateGestorDTO,
  ): Promise<string> {
    return this.gestorService.update(Number(id), updateGestorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.gestorService.remove(Number(id));
  }
}

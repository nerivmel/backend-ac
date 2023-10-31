// transaccionge.controller.ts

import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
} from '@nestjs/common';
import { TransacciongeService } from './transaccionge.service';
import { CreateTransacciongeDto } from './transaccionge.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Transaccionge } from './transaccionge.entity';

@Controller('transaccionge')
export class TransacciongeController {
  constructor(private readonly transacciongeService: TransacciongeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('archivoImagen'))
  async createTransaccionge(
    @Body() createTransacciongeDto: CreateTransacciongeDto,
    @UploadedFile() archivoImagen,
  ) {
    // Construye un objeto que coincide con la estructura del DTO
    const transacciongeData = {
      material: createTransacciongeDto.material,
      cantidad: createTransacciongeDto.cantidad,
      fecha: createTransacciongeDto.fecha,
      descripcion: createTransacciongeDto.descripcion,
      ubicacion: createTransacciongeDto.ubicacion,
      archivoImagen: archivoImagen ? archivoImagen.buffer : null,
      gestorId: createTransacciongeDto.gestorId, // Asegúrate de que esta propiedad esté presente en el DTO
      entidad_externa: createTransacciongeDto.entidad_externa, // Asegúrate de que esta propiedad esté presente en el DTO
    };

    const transaccionge =
      await this.transacciongeService.createTransaccionge(transacciongeData);

    return transaccionge;
  }
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.transacciongeService.deleteTransaccionge(id);
  }
  @Get()
  async getAllTransacciones(): Promise<Transaccionge[]> {
    return this.transacciongeService.getAllTransacciones();
  }
}

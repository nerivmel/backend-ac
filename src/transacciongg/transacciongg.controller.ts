import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTransaccionggDto } from './transacciongg.dto';
import { TransaccionggService } from './transacciongg.service';
import { Transacciongg } from './transacciongg.entity';

@Controller('transacciongg')
export class TransaccionggController {
  constructor(private readonly transaccionggService: TransaccionggService) {}

  @Post()
  @UseInterceptors(FileInterceptor('archivoImagen'))
  async createTransaccionge(
    @Body() createTransaccionggDto: CreateTransaccionggDto,
    @UploadedFile() archivoImagen,
  ) {
    const transaccionggData = {
      gestorRealizaId: createTransaccionggDto.gestorRealizaId,
      gestorRecibeId: createTransaccionggDto.gestorRecibeId,
      materialId: createTransaccionggDto.materialId,
      cantidad: createTransaccionggDto.cantidad,
      fecha: createTransaccionggDto.fecha,
      descripcion: createTransaccionggDto.descripcion,
      ubicacion: createTransaccionggDto.ubicacion,
      archivoImagen: archivoImagen ? archivoImagen.buffer : null,
    };

    const transacciongg =
      await this.transaccionggService.createTransacciongg(transaccionggData);

    return transacciongg;
  }
  @Get()
  async getAllTransacciones(): Promise<Transacciongg[]> {
    return this.transaccionggService.getAllTransacciones();
  }
}

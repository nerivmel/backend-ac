import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { CreateTransacciongtDto } from './transacciongt.dto';
import { TransacciongtService } from './transacciongt.service';
import { Transacciongt } from './transacciongt.entity';

@Controller('transacciongt')
export class TransacciongtController {
  constructor(private readonly transacciongtService: TransacciongtService) {}
  @Post()
  @UseInterceptors(FileInterceptor('archivoImagen'))
  async createTransacciongg(
    @Body() createTransacciongtDto: CreateTransacciongtDto,
    @UploadedFile() archivoImagen,
  ) {
    const transacciongtData = {
      gestorId: createTransacciongtDto.gestorId,
      transformadorId: createTransacciongtDto.transformadorId,
      materialId: createTransacciongtDto.materialId,
      cantidad: createTransacciongtDto.cantidad,
      fecha: createTransacciongtDto.fecha,
      descripcion: createTransacciongtDto.descripcion,
      ubicacion: createTransacciongtDto.ubicacion,
      archivoImagen: archivoImagen ? archivoImagen.buffer : null,
    };

    const transacciongt =
      await this.transacciongtService.createTransacciongt(transacciongtData);

    return transacciongt;
  }
  @Get()
  async getAllTransacciongt(): Promise<Transacciongt[]> {
    return this.transacciongtService.getAllTransacciongt();
  }
}

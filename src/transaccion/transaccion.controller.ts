/* eslint-disable prettier/prettier */
import { Controller, Body, Post, BadRequestException, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransaccionService } from './transaccion.service';
import { CreateTransaccionDto } from './transaccion.dto';
import { Transaccion } from './transaccion.entity';

@ApiTags('transacciones')
@Controller('transacciones')
export class TransaccionController {
  constructor(private readonly transaccionService: TransaccionService) {}

  @Post()
  async crearTransaccion(@Body() createTransaccionDto: CreateTransaccionDto): Promise<Transaccion> {
    try {
      const nuevaTransaccion = await this.transaccionService.crearTransaccion(createTransaccionDto);
      return nuevaTransaccion;
    } catch (error) {
      console.error(error); // Imprime el error en la consola del servidor o registra en los logs.
      throw new BadRequestException('Error al registrar la transacción.');
    }
  }
  @Get()
  async obtenerTodasLasTransacciones(): Promise<Transaccion[]> {
    return this.transaccionService.obtenerTodasLasTransacciones();
  }

  @Get('ge')
  async obtenerTransaccionesGestorRecibeEntidadExterna(): Promise<Transaccion[]> {
    return this.transaccionService.obtenerTransaccionesGestorRecibeEntidadExterna();
  }

  @Get('gg')
  async obtenerTransaccionesGestorRecibeGestorRealiza(): Promise<Transaccion[]> {
    return this.transaccionService.obtenerTransaccionesGestorRecibeGestorRealiza();
  }

  @Get('gt')
  async obtenerTransaccionesGestorRealizaTransformador(): Promise<Transaccion[]> {
    return this.transaccionService.obtenerTransaccionesGestorRealizaTransformador();
  }
}

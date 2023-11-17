/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateTransaccionDto {
  @ApiProperty({
    example: 1,
    description: 'ID del gestor que realiza la transacción',
  })
  @IsOptional()
  gestor_realiza: number;

  @ApiProperty({
    example: 2,
    description: 'ID del gestor que recibe la transacción',
  })
  @IsOptional()
  gestor_recibe: number;

  @ApiProperty({
    example: 3,
    description: 'ID del transformador asociado a la transacción',
  })
  @IsOptional()
  transformador: number;

  @ApiProperty({
    example: 'papel',
    description: 'material involucrado en la transaccion',
  })
  material: string;

  @ApiProperty({ example: 10, description: 'Cantidad de la transacción' })
  cantidad: string;

  @ApiProperty({
    example: '2023-11-09',
    description: 'Fecha de la transacción',
  })
  fecha: Date;

  @ApiProperty({
    example: 'Observaciones de la transacción',
    description: 'Observaciones de la transacción',
  })
  observaciones: string;

  @ApiProperty({
    example: 'ruta/al/archivo.png',
    description: 'Archivo PNG asociado a la transacción',
  })
  archivoPng: string;

  @ApiProperty({
    example: 'peranitro',
    description: 'entidad externa comercilizadora',
  })
  @IsOptional()
  entidad_externa: string;

  @ApiProperty({
    example: 'ANLA123',
    description: 'Número ANLA de la transacción',
  })
  nro_anla: number;

  @ApiProperty({
    example: 'Factura123',
    description: 'Número de factura de la transacción',
  })
  nro_factura: number;
}

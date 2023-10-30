/* eslint-disable prettier/prettier */
// transaccionge.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreateTransacciongeDto {
  @ApiProperty()
  material: string;

  @ApiProperty()
  cantidad: number;

  @ApiProperty()
  fecha: Date;

  @ApiProperty()
  archivoImagen: Buffer;

  @ApiProperty()
  gestorId: number;

  @ApiProperty()
  entidad_externa: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  ubicacion: string;

}

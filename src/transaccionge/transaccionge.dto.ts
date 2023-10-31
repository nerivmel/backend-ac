/* eslint-disable prettier/prettier */
// transaccionge.dto.ts
import { IsNotEmpty } from '@nestjs/class-validator';
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

  @IsNotEmpty()
  @ApiProperty()
  gestorId: number;

  @ApiProperty()
  entidad_externa: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  ubicacion: string;

}

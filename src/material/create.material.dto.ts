/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateMaterialDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  cantidad: number;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  fecha_adquirido: Date;

  @ApiProperty()
  gestorId: number;

  @ApiProperty()
  transformadorId: number;
}

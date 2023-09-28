/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class ProductorDTO {
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  correo: string;
  @ApiProperty()
  nit: number;
  @ApiProperty()
  telefono: number;
  @ApiProperty()
  direccion: string;
}

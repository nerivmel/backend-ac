/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
export class CreateProductorDTO {
  @ApiProperty()
  readonly correo: string;

  @ApiProperty()
  readonly nombre: string;

  @ApiProperty()
  readonly nit: number;

  @ApiProperty()
  readonly telefono: number;

  @ApiProperty()
  readonly direccion: string;
}

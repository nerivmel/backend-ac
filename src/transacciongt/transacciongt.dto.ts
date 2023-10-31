/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransacciongtDto {
  @ApiProperty()
  gestorId: number;

  @ApiProperty()
  transformadorId: number;

  @ApiProperty()
  materialId: number; 

  @ApiProperty()
  cantidad: number;

  @ApiProperty()
  fecha: Date;

  @ApiProperty({ required: false })
  descripcion: string;

  @ApiProperty({ required: false })
  ubicacion: string;

  @ApiProperty()
  archivoImagen: Buffer;
}

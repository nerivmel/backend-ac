/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransaccionggDto {
  @ApiProperty()
  gestorRealizaId: number; 

  @ApiProperty()
  gestorRecibeId: number; 

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
}

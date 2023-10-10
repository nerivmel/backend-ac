/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class TransformadorCreateDTO {
  @ApiProperty()
  razon_social: string;

  @ApiProperty()
  representante_legal: string;

  @ApiProperty()
  nit: number;

  @ApiProperty()
  telefono: number;

  @ApiProperty()
  direccion_principal: string;

  @ApiProperty()
  direccion_planta: string;

  @ApiProperty()
  departamento: string;

  @ApiProperty()
  municipio: string;

  @ApiProperty()
  correo: string;

  @ApiProperty()
  material_produce: string;

  @ApiProperty()
  periodo: string;

  @ApiProperty()
  registro_anla: boolean;

  @ApiProperty()
  numero_certificado: number;
}

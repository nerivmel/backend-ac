/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateGestorDTO {
  @ApiProperty({
    example: 'Nombre del Gestor',
    description: 'El nombre del gestor.',
  })
  nombre: string;

  @ApiProperty({ example: 100, description: 'La capacidad del gestor.' })
  capacidad: number;

  @ApiProperty({ example: 123456789, description: 'El NIT del gestor.' })
  nit: number;

  @ApiProperty({
    example: 1234567890,
    description: 'El número de teléfono del gestor.',
  })
  telefono: number;

  @ApiProperty({
    example: 'Dirección del Gestor',
    description: 'La dirección del gestor.',
  })
  direccion: string;

  @ApiProperty({ example: true, description: 'El estado del gestor.' })
  estado: boolean;

  @ApiProperty({
    example: 'Categoría del Municipio',
    description: 'La categoría del municipio.',
  })
  categoria_municipio: string;

  @ApiProperty({
    example: 'Municipio',
    description: 'El municipio del gestor.',
  })
  municipio: string;

  @ApiProperty({
    example: 'correo@example.com',
    description: 'El correo del gestor.',
  })
  correo: string;

  @ApiProperty({
    example: '10 toneladas',
    description: 'Las toneladas recolectadas por el gestor.',
  })
  toneladas_recolectadas: string;

  @ApiProperty({
    example: 'Puntos de recolección',
    description: 'Los puntos de recolección del gestor.',
  })
  puntos_recoleccion: string;

  @ApiProperty({
    example: 'Mecanismos de recolección',
    description: 'Los mecanismos de recolección del gestor.',
  })
  mecanismos_recoleccion: string;

  @ApiProperty({
    example: 'Materiales recolectados',
    description: 'Los materiales recolectados por el gestor.',
  })
  materiales_recolectados: string;
}

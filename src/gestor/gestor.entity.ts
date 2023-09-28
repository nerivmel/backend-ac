/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Gestor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  capacidad: number;

  @Column()
  nit: number;

  @Column()
  telefono: number;

  @Column()
  direccion: string;

  @Column({ type: 'boolean', default: true }) // Estado por defecto a true
  estado: boolean;

  @Column()
  categoria_municipio: string;

  @Column()
  municipio: string;

  @Column()
  correo: string;

  @Column()
  toneladas_recolectadas: string;

  @Column()
  puntos_recoleccion: string;

  @Column()
  mecanismos_recoleccion: string;

  @Column()
  materiales_recolectados: string;
}

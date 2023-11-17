/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Transformador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  razon_social: string;

  @Column()
  representante_legal: string;

  @Column({ type: 'bigint' })
  nit: number;

  @Column({ type: 'bigint' })
  telefono: number;

  @Column()
  direccion_principal: string;

  @Column()
  direccion_planta: string;

  @Column()
  departamento: string;

  @Column()
  municipio: string;

  @Column()
  correo: string;

  @Column()
  material_produce: string;

  @Column({ type: 'boolean'}) 
  registro_anla: boolean;

  @Column({ type: 'bigint', nullable: true })
  numero_certificado: number;
}

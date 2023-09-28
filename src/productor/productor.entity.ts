/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Productor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  correo: string;

  @Column()
  nombre: string;

  @Column({ type: 'bigint' })
  nit: number;

  @Column({ type: 'bigint' })
  telefono: number;

  @Column()
  direccion: string;
}

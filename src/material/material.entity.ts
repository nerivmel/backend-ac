/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Gestor } from 'src/gestor/gestor.entity';
import { Transformador } from 'src/transformador/transformador.entity';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantidad: number;

  @Column()
  descripcion: string;

  @Column({ type: 'date' })
  fecha_adquirido: Date;

  @ManyToOne(() => Gestor, (gestor) => gestor.id)
  @JoinColumn({ name: 'gestor_id' })
  gestor: Gestor;

  @ManyToOne(() => Transformador, (transformador) => transformador.id)
  @JoinColumn({ name: 'transformador_id' })
  transformador: Transformador;
}

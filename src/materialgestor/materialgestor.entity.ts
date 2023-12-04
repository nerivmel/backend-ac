/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Material } from 'src/material/material.entity';
import { Gestor } from 'src/gestor/gestor.entity';

@Entity()
export class MaterialGestor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  cantidad: number;

  @ManyToOne(() => Material, (material) => material.id)
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @ManyToOne(() => Gestor, (gestor) => gestor.id)
  @JoinColumn({ name: 'gestor_id' })
  gestor: Gestor;

}

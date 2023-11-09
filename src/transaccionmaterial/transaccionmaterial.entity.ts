/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Transaccion } from 'src/transaccion/transaccion.entity';
import { Material } from 'src/material/material.entity';

@Entity()
export class TransaccionMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @ManyToOne(() => Transaccion,(transaccion) => transaccion.id,)
  @JoinColumn({ name: 'transaccion_id' })
  transaccion: Transaccion;

  @ManyToOne(() => Material, (material) => material.id)
  @JoinColumn({ name: 'material_id' })
  material: Material;
}

import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Material } from 'src/material/material.entity';
import { Transformador } from 'src/transformador/transformador.entity';

@Entity()
export class MaterialTransformador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  cantidad: number;

  @ManyToOne(() => Material, (material) => material.id)
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @ManyToOne(() => Transformador, (transformador) => transformador.id)
  @JoinColumn({ name: 'transformador_id' })
  transformador: Transformador;
}

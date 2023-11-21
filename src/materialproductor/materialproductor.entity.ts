import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Material } from 'src/material/material.entity';
import { Productor } from 'src/productor/productor.entity';

@Entity()
export class MaterialProductor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @ManyToOne(() => Material, (material) => material.id)
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @ManyToOne(() => Productor, (productor) => productor.id)
  @JoinColumn({ name: 'productor_id' })
  productor: Productor;
}

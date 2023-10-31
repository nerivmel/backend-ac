/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gestor } from 'src/gestor/gestor.entity';
import { Material } from 'src/material/material.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Transacciongg {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Gestor, (gestor) => gestor.id)
  @JoinColumn({ name: 'gestorRealizaId' })
  gestorRealiza: Gestor;

  @ManyToOne(() => Gestor, (gestor) => gestor.id)
  @JoinColumn({ name: 'gestorRecibeId' })
  gestorRecibe: Gestor;

  @ManyToOne(() => Material, (material) => material.id)
  @JoinColumn({ name: 'materialId' })
  material: Material;

  @Column()
  cantidad: number;

  @Column()
  @ApiProperty()
  fecha: Date;

  @Column({ nullable: true })
  @ApiProperty()
  descripcion: string;

  @Column({ nullable: true })
  @ApiProperty()
  ubicacion: string;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;

  @Column({ type: 'blob', nullable: true })
  @ApiProperty()
  archivoImagen: Buffer;
}

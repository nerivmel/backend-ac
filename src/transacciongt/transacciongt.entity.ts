/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Gestor } from 'src/gestor/gestor.entity';
import { Transformador } from 'src/transformador/transformador.entity';
import { Material } from 'src/material/material.entity';

@Entity()
export class Transacciongt {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Gestor, (gestor) => gestor.id)
  @ApiProperty()
  gestor: Gestor;

  @ManyToOne(() => Transformador, (transformador) => transformador.id)
  @ApiProperty()
  transformador: Transformador;

  @ManyToOne(() => Material, (material) => material.id)
  @ApiProperty()
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

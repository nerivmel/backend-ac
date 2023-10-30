/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Gestor } from 'src/gestor/gestor.entity';

@Entity()
export class Transaccionge {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  material: string;

  @Column()
  @ApiProperty()
  cantidad: number;

  @Column()
  @ApiProperty()
  fecha: Date;

  @Column({ type: 'blob', nullable: true })
  @ApiProperty()
  archivoImagen: Buffer;

  @Column()
  @ApiProperty()
  entidad_externa: string;

  @ManyToOne(() => Gestor, (gestor) => gestor.id)
  @JoinColumn({ name: 'gestor_id' })
  gestor: Gestor;

  @Column({ type: 'text', nullable: true })
  @ApiProperty()
  descripcion: string;

  @Column({ nullable: true })
  @ApiProperty()
  ubicacion: string;
    transaccionge: Transaccionge;
}

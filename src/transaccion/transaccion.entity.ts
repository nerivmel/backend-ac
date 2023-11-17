/* eslint-disable prettier/prettier */
import { Gestor } from 'src/gestor/gestor.entity';
import { Transformador } from 'src/transformador/transformador.entity';
import { Entity,
         PrimaryGeneratedColumn, 
         Column, CreateDateColumn,
         UpdateDateColumn, 
         JoinColumn,
         ManyToOne } from 'typeorm';

@Entity()
export class Transaccion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Gestor, (gestor) => gestor.id)
  @JoinColumn({ name: 'gestorRealiza_id' })
  gestor_realiza: Gestor;

  @ManyToOne(() => Gestor, (gestor) => gestor.id)
  @JoinColumn({ name: 'gestorRecibe_id' })
  gestor_recibe: Gestor;

  @ManyToOne(() => Transformador, (transformador) => transformador.id)
  @JoinColumn({ name: 'transformador_id' })
  transformador: Transformador;

  @Column('date')
  fecha: Date;

  @Column('text')
  observaciones: string;

  @Column('text', { nullable: true })
  archivoPng: string;

  @Column({ name: 'nro_anla', nullable: true })
  nro_anla: number;

  @Column('text')
  nro_factura: number;

  @Column('text')
  entidad_externa: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}

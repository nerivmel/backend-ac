/* eslint-disable prettier/prettier */
import { MaterialProductor } from 'src/materialproductor/materialproductor.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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
  
  @OneToMany(() => MaterialProductor, (materialProductor) => materialProductor.productor)
  materialProductor: MaterialProductor[];
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  nombre: string;

  @Column({
    length: 50,
  })
  apellidos: string;

  @Column({
    length: 50,
  })
  email: string;

  @Column('text')
  password: string;
}

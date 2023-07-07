import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Movimientoequipo } from '../../movimientos/entities/movimiento.entity';

@Entity()
export class Equipos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nombre_equipo: string;

  @Column({ length: 50 })
  marca: string;

  @Column({ length: 255 })
  modelo: string;

  @Column({ length: 255, unique: true })
  serie: string;

  @Column({ length: 255, default: 'BODEGA' })
  recinto: string;

  @Column({ length: 10, default: '1' })
  estado: string;

  @OneToMany(
    () => Movimientoequipo,
    (movimientoEquipo) => movimientoEquipo.equipo,
  )
  movimientos: Movimientoequipo[];
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Equipos } from '../../equipos/entities/equipo.entity';

@Entity()
export class Movimientoequipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  equipo_id: number;

  @Column({ length: 255 })
  nombre_responsable: string;

  @Column({ length: 255 })
  recinto: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ length: 3000, default: 'SIN DETALLES' })
  detalles: string;

  @ManyToOne(() => Equipos, (equipo) => equipo.movimientos)
  @JoinColumn({ name: 'equipo_id' }) // this line is added
  equipo: Equipos;
}

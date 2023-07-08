import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Equipos } from '../../equipos/entities/equipo.entity';
import { CheckIncubadura } from './checkIncubadura.entity';

@Entity()
export class Mantencion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  equipo_id: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha: Date;

  @Column({ length: 555, nullable: false })
  nombre_responsable: string;

  @Column({ length: 255, nullable: false })
  empresa: string;

  @Column({ length: 255, nullable: false })
  recinto: string;

  @Column({ length: 3000, default: 'SIN DETALLES' })
  detalles: string;

  @ManyToOne(() => Equipos, (equipo) => equipo.mantencion)
  @JoinColumn({ name: 'equipo_id' }) // this line is added
  equipo: Equipos;

  @OneToOne(
    () => CheckIncubadura,
    (checkIncubadura) => checkIncubadura.mantencion,
  )
  checkIncubadura: CheckIncubadura;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Mantencion } from './mantencion.entity';

@Entity()
export class Checkventiladores {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mantencion_id: number;

  @Column({ default: 'SIN DETALLES', length: 3000 })
  detalles: string;

  @Column({ default: 3 })
  precioncircuito: number;

  @Column({ default: 3 })
  flujoinspiexha: number;

  @Column({ default: 3 })
  fugapresion: number;

  @Column({ default: 3 })
  valvulapeepexhala: number;

  @Column({ default: 3 })
  pruebascualitativa_ebc: number;

  @Column({ default: 3 })
  pruebapantalla: number;

  @Column({ default: 3 })
  pruebachasis: number;

  @Column({ default: 3 })
  pruebafio2: number;

  @Column({ default: 3 })
  pruebaapnea: number;

  @Column({ default: 3 })
  pruebaalarma: number;

  @Column()
  estadofinal: number;

  @OneToOne(() => Mantencion, (mantencion) => mantencion.checkVentiladores)
  @JoinColumn({ name: 'mantencion_id' })
  mantencion: Mantencion;
}

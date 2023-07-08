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
export class Checkanestasia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mantencion_id: number;

  @Column({ default: 'SIN DETALLES' })
  detalles: string;

  @Column({ default: 3 })
  chequeovisual: number;

  @Column({ default: 3 })
  limpieza: number;

  @Column({ default: 3 })
  chequeoinicial: number;

  @Column({ default: 3 })
  chequeoentradagas: number;

  @Column({ default: 3 })
  monitorexhala: number;

  @Column({ default: 3 })
  revisionestado_apl: number;

  @Column({ default: 3 })
  revisionestado_peep: number;

  @Column({ default: 3 })
  medicionpresion: number;

  @Column({ default: 3 })
  medicionflujo: number;

  @Column({ default: 3 })
  fugapresion: number;

  @Column({ default: 3 })
  revisionvalvuaoxigenoflujo: number;

  @Column({ default: 3 })
  verificacionalarmas: number;

  @Column({ default: 3 })
  pruebasseguridad: number;

  @Column()
  estadofinal: number;

  @OneToOne(() => Mantencion, (mantencion) => mantencion.checkAnestasia)
  @JoinColumn({ name: 'mantencion_id' })
  mantencion: Mantencion;
}

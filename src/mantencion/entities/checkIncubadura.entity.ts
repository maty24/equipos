import { Mantencion } from './mantencion.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Checkincubadura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  mantencion_id: number;

  @Column({ default: 'SIN DETALLES', length: 3000 })
  detalles: string;

  @Column({ default: 3 })
  visualestadoequipo: number;

  @Column({ default: 3 })
  seguridadsiselectrico: number;

  @Column({ default: 3 })
  estadocarroruedas: number;

  @Column({ default: 3 })
  estadotapaderas: number;

  @Column({ default: 3 })
  controlhumedad: number;

  @Column({ default: 3 })
  funcionamiento: number;

  @Column({ default: 3 })
  sensortemperatura: number;

  @Column({ default: 3 })
  alarma: number;

  @Column()
  estadofinal: number;

  @OneToOne(() => Mantencion, (mantencion) => mantencion.checkIncubadura)
  @JoinColumn({ name: 'mantencion_id' }) // this line is needed to specify the foreign key in the database
  mantencion: Mantencion;
}

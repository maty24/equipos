import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquiposModule } from './equipos/equipos.module';
import { Equipos } from './equipos/entities/equipo.entity';
import { MovimientosModule } from './movimientos/movimientos.module';
import { Movimientoequipo } from './movimientos/entities/movimiento.entity';
import { MantencionModule } from './mantencion/mantencion.module';
import { Mantencion ,Checkincubadura,Checkventiladores} from './mantencion/entities';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'course-db',
      username: 'alumno',
      password: '123456',
      synchronize: true,
      autoLoadEntities: false,
      entities:[Equipos,Movimientoequipo,Mantencion,Checkincubadura,Checkventiladores],
    }),
    EquiposModule,
    MovimientosModule,
    MantencionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

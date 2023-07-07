import { Module } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { MovimientosController } from './movimientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimientoequipo } from './entities/movimiento.entity';
import { EquiposModule } from '../equipos/equipos.module';

@Module({
  imports: [EquiposModule, TypeOrmModule.forFeature([Movimientoequipo])],
  controllers: [MovimientosController],
  providers: [MovimientosService],
})
export class MovimientosModule {}

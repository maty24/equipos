import { Module } from '@nestjs/common';
import { MantencionService } from './mantencion.service';
import { MantencionController } from './mantencion.controller';
import { EquiposModule } from '../equipos/equipos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mantencion } from './entities/mantencion.entity';

@Module({
  imports: [EquiposModule, TypeOrmModule.forFeature([Mantencion])],
  controllers: [MantencionController],
  providers: [MantencionService],
})
export class MantencionModule {}

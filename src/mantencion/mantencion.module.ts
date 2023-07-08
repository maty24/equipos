import { Module } from '@nestjs/common';
import { MantencionService } from './mantencion.service';
import { MantencionController } from './mantencion.controller';
import { EquiposModule } from '../equipos/equipos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mantencion, Checkincubadura, Checkventiladores } from './entities';

@Module({
  imports: [
    EquiposModule,
    TypeOrmModule.forFeature([Mantencion, Checkincubadura, Checkventiladores]),
  ],
  controllers: [MantencionController],
  providers: [MantencionService],
})
export class MantencionModule {}

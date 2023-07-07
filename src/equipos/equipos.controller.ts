import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto, EquipoDTO } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Post()
  create(@Body() createEquiposmedicoDto: CreateEquipoDto) {
    return this.equiposService.create(createEquiposmedicoDto);
  }

  @Post('/multi')
  createMulti(@Body() datos: EquipoDTO[]) {
    return this.equiposService.createMulti(datos);
  }

  @Get()
  findAll() {
    return this.equiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equiposService.findOne(+id);
  }

  @Get('movimiento/:serie')
  findOneSerieR(@Param('serie') serie: string) {
    return this.equiposService.findOneSerialRelationMovimiento(serie);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipoDto: UpdateEquipoDto) {
    return this.equiposService.update(+id, updateEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equiposService.remove(+id);
  }
}

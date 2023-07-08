import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MantencionService } from './mantencion.service';
import {
  CreateMantencionDto,
  CreateCheckIncubaduraDto,
  CreateCheckVentiladoresDto,
  CreateCheckAnestasiaDto,
} from './dto/create-mantencion.dto';
import { UpdateMantencionDto } from './dto/update-mantencion.dto';

@Controller('mantencion')
export class MantencionController {
  constructor(private readonly mantencionService: MantencionService) {}

  @Post()
  create(
    @Body('/incubadora')
    createDto: {
      mantencion: CreateMantencionDto;
      checkIncubadura: CreateCheckIncubaduraDto;
    },
  ) {
    return this.mantencionService.createIncubadora(
      createDto.mantencion,
      createDto.checkIncubadura,
    );
  }

  @Post('/ventiladores')
  createVentiladores(
    @Body()
    createDto: {
      mantencion: CreateMantencionDto;
      checkVentiladores: CreateCheckVentiladoresDto;
    },
  ) {
    return this.mantencionService.createVentiladores(
      createDto.mantencion,
      createDto.checkVentiladores,
    );
  }

  @Post('/anestasia')
  createAnestasia(
    @Body()
    createDto: {
      mantencion: CreateMantencionDto;
      checkAnestesia: CreateCheckAnestasiaDto;
    },
  ) {
    return this.mantencionService.createAnestasia(
      createDto.mantencion,
      createDto.checkAnestesia,
    );
  }

  @Get()
  findAll() {
    return this.mantencionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mantencionService.findOneIncubadora(+id);
  }

  @Get('ventiladores/:id')
  findOneVentiladores(@Param('id') id: string) {
    return this.mantencionService.findOneVentiladores(+id);
  }

  @Get('anestasia/:id')
  findOneAnestasia(@Param('id') id: string) {
    return this.mantencionService.findOneAnestasia(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMantencionDto: UpdateMantencionDto,
  ) {
    return this.mantencionService.update(+id, updateMantencionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mantencionService.remove(+id);
  }
}

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
} from './dto/create-mantencion.dto';
import { UpdateMantencionDto } from './dto/update-mantencion.dto';

@Controller('mantencion')
export class MantencionController {
  constructor(private readonly mantencionService: MantencionService) {}

  @Post()
  create(
    @Body()
    createDto: {
      mantencion: CreateMantencionDto;
      checkIncubadura: CreateCheckIncubaduraDto;
    },
  ) {
    return this.mantencionService.create(
      createDto.mantencion,
      createDto.checkIncubadura,
    );
  }

  @Get()
  findAll() {
    return this.mantencionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mantencionService.findOne(+id);
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

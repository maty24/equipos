import { Injectable } from '@nestjs/common';
import { CreateMantencionDto } from './dto/create-mantencion.dto';
import { UpdateMantencionDto } from './dto/update-mantencion.dto';

@Injectable()
export class MantencionService {
  create(createMantencionDto: CreateMantencionDto) {
    return 'This action adds a new mantencion';
  }

  findAll() {
    return `This action returns all mantencion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mantencion`;
  }

  update(id: number, updateMantencionDto: UpdateMantencionDto) {
    return `This action updates a #${id} mantencion`;
  }

  remove(id: number) {
    return `This action removes a #${id} mantencion`;
  }
}

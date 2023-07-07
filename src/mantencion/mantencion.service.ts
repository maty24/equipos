import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMantencionDto } from './dto/create-mantencion.dto';
import { UpdateMantencionDto } from './dto/update-mantencion.dto';
import { Mantencion } from './entities/mantencion.entity';
import { EquiposService } from '../equipos/equipos.service';

@Injectable()
export class MantencionService {
  private readonly logger = new Logger('Movimientos');
  constructor(
    @InjectRepository(Mantencion)
    private readonly mantencionRepository: Repository<Mantencion>,
    private readonly equiposmedicoRepository: EquiposService,
  ) {}
  async create(createMantencionDto: CreateMantencionDto) {
    try {
      const movimiento = this.mantencionRepository.create(createMantencionDto);
      const equiposmedico = await this.equiposmedicoRepository.findOne(
        createMantencionDto.equipo_id,
      );
      movimiento.equipo = equiposmedico;

      const rta = await this.mantencionRepository.save(movimiento);
      return rta;
    } catch (error) {
      this.handleDBExceptions(error);
      return null;
    }
  }

  async findAll() {
    try {
      const rta = this.mantencionRepository.find({
        relations: {
          equipo: true,
        },
        order: {
          fecha: 'DESC',
        },
      });
      return rta;
    } catch (error) {
      this.handleDBExceptions(error);
      return null;
    }
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

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}

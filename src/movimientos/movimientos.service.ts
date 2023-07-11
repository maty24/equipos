import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { Movimientoequipo } from './entities/movimiento.entity';
import { EquiposService } from '../equipos/equipos.service';

@Injectable()
export class MovimientosService {
  private readonly logger = new Logger('Movimientos');
  constructor(
    @InjectRepository(Movimientoequipo)
    private readonly movimientoRepository: Repository<Movimientoequipo>,
    private readonly equiposmedicoRepository: EquiposService,
  ) {}

  async create(createMovimientoDto: CreateMovimientoDto) {
    try {
      const movimiento = this.movimientoRepository.create(createMovimientoDto);
      const equiposmedico = await this.equiposmedicoRepository.findOne(
        createMovimientoDto.equipo_id,
      );
      movimiento.equipo = equiposmedico;

      const rta = await this.movimientoRepository.save(movimiento);
      return rta;
    } catch (error) {
      this.handleDBExceptions(error);
      return null;
    }
  }

  async findAll() {
    try {
      const rta = this.movimientoRepository.find({
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

  async findAllSinRelacion() {
    try {
      const rta = this.movimientoRepository.find({
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

  async findOne(id: number) {
    try {
      const rta = await this.movimientoRepository.findOneBy({ id });
      if (!rta)
        throw new NotFoundException(`No existe el serial con numero: ${id}`);
      return rta;
    } catch (error) {
      this.handleDBExceptions(error);
      return null;
    }
  }

  update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
    return `This action updates a #${id} movimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimiento`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateMantencionDto,
  CreateCheckIncubaduraDto,
} from './dto/create-mantencion.dto';
import { UpdateMantencionDto } from './dto/update-mantencion.dto';
import { Mantencion } from './entities/mantencion.entity';
import { EquiposService } from '../equipos/equipos.service';
import { CheckIncubadura } from './entities/checkIncubadura.entity';

@Injectable()
export class MantencionService {
  private readonly logger = new Logger('Movimientos');
  constructor(
    @InjectRepository(Mantencion)
    private readonly mantencionRepository: Repository<Mantencion>,
    private readonly checkIncubaduraRepository: Repository<CheckIncubadura>,
    private readonly equiposmedicoRepository: EquiposService,
  ) {}
  async create(
    createMantencionDto: CreateMantencionDto,
    createCheckIncubaduraDto: CreateCheckIncubaduraDto,
  ) {
    try {
      const mantencion = this.mantencionRepository.create(createMantencionDto);
      const equiposmedico = await this.equiposmedicoRepository.findOne(
        createMantencionDto.equipo_id,
      );
      mantencion.equipo = equiposmedico;
      const savedMantencion = await this.mantencionRepository.save(mantencion);

      createCheckIncubaduraDto.mantencion_id = savedMantencion.id;
      const checkIncubadura = this.checkIncubaduraRepository.create(
        createCheckIncubaduraDto,
      );
      checkIncubadura.mantencion = savedMantencion;

      const savedCheckIncubadura = await this.checkIncubaduraRepository.save(
        checkIncubadura,
      );

      return {
        mantencion: savedMantencion,
        checkIncubadura: savedCheckIncubadura,
      };
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

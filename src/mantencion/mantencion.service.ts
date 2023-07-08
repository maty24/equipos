import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateMantencionDto,
  CreateCheckIncubaduraDto,
  CreateCheckVentiladoresDto,
  CreateCheckAnestasiaDto,
} from './dto/create-mantencion.dto';
import { UpdateMantencionDto } from './dto/update-mantencion.dto';
import { Mantencion, Checkincubadura, Checkventiladores ,Checkanestasia} from './entities';
import { EquiposService } from '../equipos/equipos.service';

@Injectable()
export class MantencionService {
  private readonly logger = new Logger('Movimientos');
  constructor(
    @InjectRepository(Mantencion)
    private readonly mantencionRepository: Repository<Mantencion>,
    @InjectRepository(Checkincubadura)
    private readonly checkIncubaduraRepository: Repository<Checkincubadura>,
    @InjectRepository(Checkventiladores)
    private readonly checkVentiladoresRepository: Repository<Checkventiladores>,
    @InjectRepository(Checkanestasia)
    private readonly checkAnestasiaRepository: Repository<Checkanestasia>,
    private readonly equiposmedicoRepository: EquiposService,
  ) {}

  async createIncubadora(
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
  async createVentiladores(
    createMantencionDto: CreateMantencionDto,
    createCheckVentiladoresDto: CreateCheckVentiladoresDto,
  ) {
    try {
      const mantencion = this.mantencionRepository.create(createMantencionDto);
      const equiposmedico = await this.equiposmedicoRepository.findOne(
        createMantencionDto.equipo_id,
      );
      mantencion.equipo = equiposmedico;
      const savedMantencion = await this.mantencionRepository.save(mantencion);

      createCheckVentiladoresDto.mantencion_id = savedMantencion.id;
      const checkVentiladores = this.checkVentiladoresRepository.create(
        createCheckVentiladoresDto,
      );
      checkVentiladores.mantencion = savedMantencion;

      const savedCheckVentiladores =
        await this.checkVentiladoresRepository.save(checkVentiladores);
      return {
        mantencion: savedMantencion,
        checkVentiladores: savedCheckVentiladores,
      };
    } catch (error) {}
  }
   
  async createAnestasia(
    createMantencionDto: CreateMantencionDto,
    createCheckAnestasiaDto: CreateCheckAnestasiaDto,
  ) {
    try {
      const mantencion = this.mantencionRepository.create(createMantencionDto);
      const equiposmedico = await this.equiposmedicoRepository.findOne(
        createMantencionDto.equipo_id,
      );
      mantencion.equipo = equiposmedico;
      const savedMantencion = await this.mantencionRepository.save(mantencion);

      createCheckAnestasiaDto.mantencion_id = savedMantencion.id;
      const checkAnestasia = this.checkAnestasiaRepository.create(
        createCheckAnestasiaDto,
      );
      checkAnestasia.mantencion = savedMantencion;

      const savedCheckAnestasia =
        await this.checkAnestasiaRepository.save(checkAnestasia);
      return {
        mantencion: savedMantencion,
        checkAnestasia: savedCheckAnestasia,
      };
    } catch (error) {}
  
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

  async findOneIncubadora(id: number) {
    try {
      const rta = await this.mantencionRepository.findOne({
        where: { id },
        relations: ['checkIncubadura'],
      });
      if (!rta)
        throw new NotFoundException(`No existe el serial con numero: ${id}`);
      return rta;
    } catch (error) {
      this.handleDBExceptions(error);
      return null;
    }
  }
  async findOneVentiladores(id: number) {
    try {
      const rta = await this.mantencionRepository.findOne({
        where: { id },
        relations: ['checkVentiladores'],
      });
      if (!rta)
        throw new NotFoundException(`No existe el serial con numero: ${id}`);
      return rta;
    } catch (error) {
      this.handleDBExceptions(error);
      return null;
    }
  }

  async findOneAnestasia(id: number) {
    try {
      const rta = await this.mantencionRepository.findOne({
        where: { id },
        relations: ['checkAnestasia'],
      });
      if (!rta)
        throw new NotFoundException(`No existe el serial con numero: ${id}`);
      return rta;
    } catch (error) {
      this.handleDBExceptions(error);
      return null;
    }
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

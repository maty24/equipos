import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEquipoDto, EquipoDTO } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { Equipos } from './entities/equipo.entity';

@Injectable()
export class EquiposService {
  private readonly logger = new Logger('RegistroEquipos');
  constructor(
    @InjectRepository(Equipos)
    private readonly equipomedicoRepository: Repository<Equipos>,
  ) {}

  async create(createRegequipoDto: CreateEquipoDto) {
    try {
      const rta = this.equipomedicoRepository.create(createRegequipoDto);
      await this.equipomedicoRepository.save(rta);
      return rta;
    } catch (error) {
      this.handleDBExceptions(error);
      return null;
    }
  }

  async createMulti(createRegequipoDto: EquipoDTO[]) {
    try {
      const entitiesToInsert = createRegequipoDto.map((equipo) =>
        this.equipomedicoRepository.create(equipo),
      );
      await this.equipomedicoRepository.insert(entitiesToInsert);
      return 'Registros insertados exitosamente';
    } catch (error) {
      this.handleDBExceptions(error);
      return null;
    }
  }

  async findAll() {
    try {
      const equipos = await this.equipomedicoRepository.find();
      return equipos;
    } catch (error) {
      return null;
    }
  }

  async findOne(id: number) {
    try {
      const rta = await this.equipomedicoRepository.findOneBy({ id });
      if (!rta)
        throw new NotFoundException(`No existe el serial con numero: ${id}`);
      return rta;
    } catch (error) {
      this.handleDBExceptions(error);
      return null;
    }
  }
  async findOneSerialRelationMovimiento(serie: string) {
    try {
      const rta = await this.equipomedicoRepository.findOne({
        where: { serie },
        relations: ['movimientos'],
      });
      if (!rta)
        throw new NotFoundException(`No existe el serial con numero: ${serie}`);
      return rta;
    } catch (error) {
      this.handleDBExceptions(error);
      return null;
    }
  }
  async findOneSerialRelationMantencion(serie: string) {
    try {
      const rta = await this.equipomedicoRepository.findOne({
        where: { serie },
        relations: ['mantencion'],
      });
      if (!rta)
        throw new NotFoundException(`No existe el serial con numero: ${serie}`);
      return rta;
    } catch (error) {
      this.handleDBExceptions(error);
      return null;
    }
  }

  update(id: number, updateEquipoDto: UpdateEquipoDto) {
    return `This action updates a #${id} equipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipo`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}

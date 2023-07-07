import { IsString, MinLength } from 'class-validator';

export class CreateEquipoDto {
  @IsString()
  @MinLength(1)
  recinto: string;

  @IsString()
  @MinLength(1)
  serie: string;

  @IsString()
  @MinLength(1)
  nombre_equipo: string;

  @IsString()
  @MinLength(1)
  marca: string;

  @IsString()
  @MinLength(1)
  modelo: string;
}

export class EquipoDTO {
  recinto: string;
  nombre_equipo: string;
  marca: string;
  modelo: string;
  serie: string;
}

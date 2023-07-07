import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateMantencionDto {
  
  @IsString()
  @MinLength(1)
  nombre_responsable: string;

  @IsString()
  @MinLength(1)
  recinto: string;

  @IsString()
  @MinLength(1)
  empresa: string;

  @IsInt()
  @IsPositive()
  equipo_id: number;

  @IsString()
  @MinLength(1)
  @IsOptional()
  detalles: string;
}

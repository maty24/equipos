import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
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


export class CreateCheckIncubaduraDto {
  @IsOptional()
  @IsInt()
  mantencion_id: number;

  @IsOptional()
  @IsNotEmpty()
  detalles: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  visualestadoequipo: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  seguridadsiselectrico: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  estadocarroruedas: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  estadotapaderas: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  controlhumedad: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  funcionamiento: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  sensortemperatura: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  alarma: number;

  @IsInt()
  @Min(1)
  @Max(3)
  estadofinal: number;
}

import { IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';


export class CreateMovimientoDto {
    @IsString()
    @MinLength(1)
    nombre_responsable: string;
  
    @IsString()
    @MinLength(1)
    recinto: string;
  
    @IsInt()
    @IsPositive()
    equipo_id: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    detalles:string
}

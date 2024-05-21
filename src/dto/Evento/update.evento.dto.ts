import { IsString, IsOptional, IsDate, IsDateString } from "class-validator";

export class UpdateEventoDto {
  @IsString()
  @IsOptional()
  tipo?: string;

  @IsString()
  @IsOptional()
  dispositivoId?: string;

  @IsDateString()
  @IsOptional()
  timestamp?: Date;

  @IsString()
  @IsOptional()
  detalhes?: string;
}

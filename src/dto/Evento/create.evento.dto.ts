import { IsDate, IsDateString, IsOptional, IsString } from "class-validator";

export default class CreateEventoDto {
  @IsString()
  tipo!: string;

  @IsString()
  dispositivoId!: string;


  @IsString()
  @IsOptional()
  detalhes?: string;
}

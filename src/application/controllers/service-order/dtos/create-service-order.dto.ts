import { Expose, Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateServiceOrderDto {
  @Expose()
  @IsNotEmpty({ message: "O veículo é obrigatório." })
  @IsInt({ message: "O ID do veículo deve ser um número inteiro." })
  veiculo: number;

  @Expose()
  @IsOptional()
  status: string;

  @Expose()
  @Type(() => Date)
  @IsDate({ message: "Data de fechamento inválida." })
  data_fechamento: Date;

  @Expose()
  @IsInt({ message: "O Km de atendimento deve ser um número inteiro." })
  @Min(0, { message: "O Km não pode ser negativo." })
  km_atendimento: number;

  @Expose()
  @IsOptional()
  @IsString()
  observacoes?: string;

  @Expose()
  @IsNumber({}, { message: "O valor total deve ser um número." })
  valor_total: number;
}
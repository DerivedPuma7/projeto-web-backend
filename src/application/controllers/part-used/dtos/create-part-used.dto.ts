import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreatePartUsedDto {
  @Expose()
  @IsNotEmpty({ message: "O ID da ordem de serviço é obrigatório." })
  @IsInt()
  ordem_servico: number;

  @Expose()
  @IsNotEmpty({ message: "O ID da peça é obrigatório." })
  @IsInt()
  peca: number;

  @Expose()
  @IsInt({ message: "A quantidade deve ser um número inteiro." })
  @Min(1, { message: "A quantidade mínima é 1." })
  quantidade: number;

  @Expose()
  @IsOptional()
  @IsNumber({}, { message: "O valor unitário deve ser um número." })
  @Min(0)
  valor_unitario?: number;
}
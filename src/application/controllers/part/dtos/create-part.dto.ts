import { Expose } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min
} from 'class-validator';

export class CreatePartDto {
  @Expose()
  @IsString({ message: "O nome deve ser uma string." })
  @IsNotEmpty({ message: "O nome é obrigatório." })
  @MaxLength(100, { message: "O nome deve ter no máximo 100 caracteres." })
  nome: string;

  @Expose()
  @IsString({ message: "O código deve ser uma string." })
  @MaxLength(50, { message: "O código deve ter no máximo 50 caracteres." })
  codigo: string;

  @Expose()
  @IsString({ message: "O fabricante deve ser uma string." })
  @MaxLength(100, { message: "O fabricante deve ter no máximo 100 caracteres." })
  fabricante: string;

  @Expose()
  @IsNumber({}, { message: "O preço unitário deve ser um número." })
  @Min(0, { message: "O preço unitário não pode ser negativo." })
  preco_unitario: number;

  @Expose()
  @IsInt({ message: "O estoque atual deve ser um número inteiro." })
  @Min(0, { message: "O estoque não pode ser negativo." })
  estoque_atual: number;
}
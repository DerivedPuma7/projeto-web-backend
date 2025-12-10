
import { Expose } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min
} from 'class-validator';

export class CreateVehicleDto {
  @Expose()
  @IsString({ message: "A placa deve ser uma string." })
  @IsNotEmpty({ message: "A placa é obrigatória." })
  @MaxLength(12, { message: "A placa deve ter no máximo 12 caracteres." })
  placa: string;

  @Expose()
  @IsString({ message: "O modelo deve ser uma string." })
  @MaxLength(100, { message: "O modelo deve ter no máximo 100 caracteres." })
  modelo: string;

  @Expose()
  @IsString({ message: "A marca deve ser uma string." })
  @MaxLength(50, { message: "A marca deve ter no máximo 50 caracteres." })
  marca: string;

  @Expose()
  @IsInt({ message: "A quilometragem (km) deve ser um número inteiro." })
  @Min(0, { message: "A quilometragem não pode ser negativa." })
  km_atual: number;

  @Expose()
  @IsString({ message: "O Renavam deve ser uma string." })
  @MaxLength(32, { message: "O Renavam deve ter no máximo 32 caracteres." })
  renavam: string;

  @Expose()
  @IsString({ message: "O chassi deve ser uma string." })
  @MaxLength(64, { message: "O chassi deve ter no máximo 64 caracteres." })
  chassi: string;

  @Expose()
  @IsString({ message: "A cor deve ser uma string." })
  @MaxLength(30, { message: "A cor deve ter no máximo 30 caracteres." })
  cor: string;

  @Expose()
  @IsInt({ message: "O ano deve ser um número inteiro." })
  ano: number;

  @Expose()
  @IsString({ message: "A observação deve ser uma string." })
  @IsOptional()
  observacao?: string;

  @Expose()
  @IsNotEmpty({ message: "O userId é obrigatório." })
  userId: string;
}

export class CreateVehicleResponseDto extends CreateVehicleDto {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
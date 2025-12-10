import { Expose } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdatePartDto {
  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nome?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  codigo?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  fabricante?: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  @Min(0)
  preco_unitario?: number;

  @Expose()
  @IsOptional()
  @IsInt()
  @Min(0)
  estoque_atual?: number;
}
import { Expose } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min
} from 'class-validator';

export class UpdateVehicleDto {
  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(12)
  placa?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  modelo?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  marca?: string;

  @Expose()
  @IsOptional()
  @IsInt()
  @Min(0)
  km_atual?: number;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(32)
  renavam?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(64)
  chassi?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  cor?: string;

  @Expose()
  @IsOptional()
  @IsInt()
  ano?: number;

  @Expose()
  @IsOptional()
  @IsString()
  observacao?: string;
}
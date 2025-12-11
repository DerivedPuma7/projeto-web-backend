import { Expose } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdatePartUsedDto {
  @Expose()
  @IsOptional()
  @IsInt()
  @Min(1)
  quantidade?: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  @Min(0)
  valor_unitario?: number;
}
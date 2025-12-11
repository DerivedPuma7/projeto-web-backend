import { Expose } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ServiceOrderStatus } from 'src/infra/entities/service-order/enums/service-order-status.enum';

export class UpdateServiceOrderDto {
  @Expose()
  @IsOptional()
  @IsEnum(ServiceOrderStatus, { message: "Status inválido." })
  status?: ServiceOrderStatus;

  @Expose()
  @IsOptional()
  @IsInt()
  @Min(0)
  km_atendimento?: number;

  @Expose()
  @IsOptional()
  @IsString()
  observacoes?: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  valor_total?: number;
}

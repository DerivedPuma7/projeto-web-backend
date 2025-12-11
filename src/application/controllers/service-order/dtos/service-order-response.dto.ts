import { Expose } from "class-transformer";
import { ServiceOrderStatus } from "src/infra/entities/service-order/enums/service-order-status.enum";
import { ServiceOrder } from "src/infra/entities/service-order/service-order.entity";


export class ServiceOrderResponseDto {
  @Expose() id?: number;
  @Expose() veiculo_id: number;
  @Expose() status: ServiceOrderStatus;
  @Expose() data_abertura: Date;
  @Expose() data_fechamento: Date;
  @Expose() km_atendimento: number;
  @Expose() observacoes: string;
  @Expose() valor_total: number;
  @Expose() criado_em?: Date;
  @Expose() atualizado_em?: Date;

  static toDto(os: ServiceOrder): ServiceOrderResponseDto {
    return {
      id: os.id,
      veiculo_id: os.vehicleId,
      status: os.status,
      data_abertura: os.openingDate,
      data_fechamento: os.closingDate,
      km_atendimento: os.attendanceMileage,
      observacoes: os.observations,
      valor_total: typeof os.totalValue === 'string' ? parseFloat(os.totalValue) : os.totalValue,
      criado_em: os.createdAt,
      atualizado_em: os.updatedAt,
    };
  }
}
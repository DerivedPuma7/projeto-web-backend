import { Injectable, NotFoundException } from "@nestjs/common";
import { ServiceOrderRepository } from "src/infra/repositories/service-order.repository";
import { UpdateServiceOrderDto } from "src/application/controllers/service-order/dtos/update-service-order.dto";
import { ServiceOrderResponseDto } from "src/application/controllers/service-order/dtos/service-order-response.dto";
import { ServiceOrderStatus } from "src/infra/entities/service-order/enums/service-order-status.enum";

@Injectable()
export class UpdateServiceOrderService {
  constructor(private readonly serviceOrderRepository: ServiceOrderRepository) { }

  async execute(id: number, data: UpdateServiceOrderDto): Promise<ServiceOrderResponseDto> {
    const serviceOrder = await this.serviceOrderRepository.findOne({ where: { id } });

    if (!serviceOrder) {
      throw new NotFoundException(`Ordem de Serviço com ID ${id} não encontrada.`);
    }

    if (data.status) {
      serviceOrder.status = data.status;
      if (
        (data.status === ServiceOrderStatus.FINISHED || data.status === ServiceOrderStatus.CANCELED) &&
        !serviceOrder.closingDate
      ) {
        serviceOrder.closingDate = new Date();
      }
    }

    if (data.km_atendimento !== undefined) serviceOrder.attendanceMileage = data.km_atendimento;
    if (data.observacoes !== undefined) serviceOrder.observations = data.observacoes;
    if (data.valor_total !== undefined) serviceOrder.totalValue = data.valor_total;

    const updatedOS = await this.serviceOrderRepository.save(serviceOrder);
    return ServiceOrderResponseDto.toDto(updatedOS);
  }
}
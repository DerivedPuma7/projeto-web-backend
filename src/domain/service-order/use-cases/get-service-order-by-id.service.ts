import { Injectable, NotFoundException } from "@nestjs/common";
import { ServiceOrderRepository } from "src/infra/repositories/service-order.repository";
import { ServiceOrderResponseDto } from "src/application/controllers/service-order/dtos/service-order-response.dto";

@Injectable()
export class GetServiceOrderByIdService {
  constructor(private readonly serviceOrderRepository: ServiceOrderRepository) { }

  async execute(id: number): Promise<ServiceOrderResponseDto> {
    const os = await this.serviceOrderRepository.findOne({ where: { id } });

    if (!os) {
      throw new NotFoundException(`Ordem de Serviço com ID ${id} não encontrada.`);
    }

    return ServiceOrderResponseDto.toDto(os);
  }
}

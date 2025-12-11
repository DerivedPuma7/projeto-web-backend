import { Injectable } from "@nestjs/common";
import { ServiceOrderRepository } from "src/infra/repositories/service-order.repository";
import { ServiceOrderResponseDto } from "src/application/controllers/service-order/dtos/service-order-response.dto";

@Injectable()
export class GetAllServiceOrdersService {
  constructor(private readonly serviceOrderRepository: ServiceOrderRepository) { }

  async execute(): Promise<ServiceOrderResponseDto[]> {
    const orders = await this.serviceOrderRepository.find({
      order: { openingDate: 'DESC' }
    });
    return orders.map(os => ServiceOrderResponseDto.toDto(os));
  }
}

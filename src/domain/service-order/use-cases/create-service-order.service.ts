import { Injectable, NotFoundException } from "@nestjs/common";
import { ServiceOrderRepository } from "src/infra/repositories/service-order.repository";
import { VehicleRepository } from "src/infra/repositories/vehicle.repository";
import { CreateServiceOrderDto } from "src/application/controllers/service-order/dtos/create-service-order.dto";
import { ServiceOrderStatus } from "src/infra/entities/service-order/enums/service-order-status.enum";
import { ServiceOrderResponseDto } from "src/application/controllers/service-order/dtos/service-order-response.dto";


@Injectable()
export class CreateServiceOrderService {
  constructor(
    private readonly serviceOrderRepository: ServiceOrderRepository,
    private readonly vehicleRepository: VehicleRepository,
  ) { }

  async execute(data: CreateServiceOrderDto): Promise<ServiceOrderResponseDto> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id: data.veiculo } });

    if (!vehicle) {
      throw new NotFoundException(`Veículo com ID ${data.veiculo} não encontrado.`);
    }

    const serviceOrder = this.serviceOrderRepository.create({
      vehicleId: data.veiculo,
      status: ServiceOrderStatus.OPEN,
      attendanceMileage: data.km_atendimento,
      observations: data.observacoes,
      closingDate: data.data_fechamento,
      totalValue: data.valor_total,
      openingDate: new Date(),
    });

    const savedOS = await this.serviceOrderRepository.save(serviceOrder);
    return ServiceOrderResponseDto.toDto(savedOS);
  }
}

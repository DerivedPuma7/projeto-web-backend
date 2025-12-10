import { CustomerRepository } from "src/infra/repositories/customer.repository";

import { Injectable, NotFoundException } from "@nestjs/common";
import { GetCustomerDashboardResponseDto } from "src/application/controllers/customer/dtos/get-customer-dashboard-response.dto";

@Injectable()
export class GetCustomerDashboardService {
  constructor(
    private readonly customerRepository: CustomerRepository,
  ) { }

  async execute(id: number): Promise<GetCustomerDashboardResponseDto> {
    const existingCustomer = await this.customerRepository.findOne({
      where: {
        id
      },
      relations: ['vehicles']
    });

    if (!existingCustomer) {
      throw new NotFoundException("Usuário não encontrado.");
    }

    return {
      veiculos: existingCustomer.vehicles.map(vehicle => ({
        ano: vehicle.year,
        chassi: vehicle.chassi,
        cor: vehicle.color,
        createdAt: vehicle.createdAt,
        id: vehicle.id,
        km_atual: vehicle.currentMileage,
        marca: vehicle.brand,
        modelo: vehicle.model,
        observacao: vehicle.observations,
        placa: vehicle.licensePlate,
        renavam: vehicle.renavam,
        updatedAt: vehicle.updatedAt,
        userId: vehicle.customerId,
      })),
      orcamentoAguardandoAprovacao: [],
      outrosOrcamentos: [],
    };
  }
}

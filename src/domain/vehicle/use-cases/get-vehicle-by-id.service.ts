import { Injectable, NotFoundException } from "@nestjs/common";
import { VehicleRepository } from "src/infra/repositories/vehicle.repository";
import { VehicleResponseDto } from "src/application/controllers/vehicle/dtos/vehicle-response.dto";

@Injectable()
export class GetVehicleByIdService {
  constructor(private readonly vehicleRepository: VehicleRepository) { }

  async execute(id: number): Promise<VehicleResponseDto> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });

    if (!vehicle) {
      throw new NotFoundException(`Veículo com ID ${id} não encontrado.`);
    }

    return VehicleResponseDto.toDto(vehicle);
  }
}
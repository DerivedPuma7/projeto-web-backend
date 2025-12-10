import { Injectable } from "@nestjs/common";
import { VehicleRepository } from "src/infra/repositories/vehicle.repository";
import { VehicleResponseDto } from "src/application/controllers/vehicle/dtos/vehicle-response.dto";

@Injectable()
export class GetAllVehiclesService {
  constructor(private readonly vehicleRepository: VehicleRepository) { }

  async execute(): Promise<VehicleResponseDto[]> {
    const vehicles = await this.vehicleRepository.find({
      order: { createdAt: 'DESC' }
    });

    return vehicles.map(vehicle => VehicleResponseDto.toDto(vehicle));
  }
}
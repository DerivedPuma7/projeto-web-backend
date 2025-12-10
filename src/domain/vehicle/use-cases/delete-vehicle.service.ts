import { Injectable, NotFoundException } from "@nestjs/common";
import { VehicleRepository } from "src/infra/repositories/vehicle.repository";

@Injectable()
export class DeleteVehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) { }

  async execute(id: number): Promise<void> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });

    if (!vehicle) {
      throw new NotFoundException(`Veículo com ID ${id} não encontrado.`);
    }

    await this.vehicleRepository.delete(id);
  }
}
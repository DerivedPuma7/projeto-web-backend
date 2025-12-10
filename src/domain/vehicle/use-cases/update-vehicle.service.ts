import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { VehicleRepository } from "src/infra/repositories/vehicle.repository";
import { UpdateVehicleDto } from "src/application/controllers/vehicle/dtos/update-vehicle.dto";
import { VehicleResponseDto } from "src/application/controllers/vehicle/dtos/vehicle-response.dto";
import { Vehicle } from "src/infra/entities/vehicle/vehicle.entity";

@Injectable()
export class UpdateVehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) { }

  async execute(id: number, data: UpdateVehicleDto): Promise<VehicleResponseDto> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });

    if (!vehicle) {
      throw new NotFoundException(`Veículo com ID ${id} não encontrado.`);
    }

    await this.validateUniqueFields(vehicle, data);

    if (data.placa) vehicle.licensePlate = data.placa;
    if (data.modelo) vehicle.model = data.modelo;
    if (data.marca) vehicle.brand = data.marca;
    if (data.km_atual !== undefined) vehicle.currentMileage = data.km_atual;
    if (data.renavam) vehicle.renavam = data.renavam;
    if (data.chassi) vehicle.chassi = data.chassi;
    if (data.cor) vehicle.color = data.cor;
    if (data.ano) vehicle.year = data.ano;
    if (data.observacao) vehicle.observations = data.observacao;

    const updatedVehicle = await this.vehicleRepository.save(vehicle);
    return VehicleResponseDto.toDto(updatedVehicle);
  }

  private async validateUniqueFields(currentVehicle: Vehicle, data: UpdateVehicleDto): Promise<void> {
    if (data.placa && data.placa !== currentVehicle.licensePlate) {
      const exists = await this.vehicleRepository.findOne({ where: { licensePlate: data.placa } });
      if (exists) throw new ConflictException("Já existe um veículo cadastrado com essa placa.");
    }

    if (data.renavam && data.renavam !== currentVehicle.renavam) {
      const exists = await this.vehicleRepository.findOne({ where: { renavam: data.renavam } });
      if (exists) throw new ConflictException("Já existe um veículo cadastrado com esse Renavam.");
    }

    if (data.chassi && data.chassi !== currentVehicle.chassi) {
      const exists = await this.vehicleRepository.findOne({ where: { chassi: data.chassi } });
      if (exists) throw new ConflictException("Já existe um veículo cadastrado com esse Chassi.");
    }
  }
}
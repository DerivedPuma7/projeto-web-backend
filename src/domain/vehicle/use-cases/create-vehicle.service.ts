import { ConflictException, Injectable } from "@nestjs/common";
import { CreateVehicleDto, CreateVehicleResponseDto } from "src/application/controllers/vehicle/dtos/crete-vehicle.dto";
import { VehicleResponseDto } from "src/application/controllers/vehicle/dtos/vehicle-response.dto";
import { VehicleRepository } from "src/infra/repositories/vehicle.repository";

@Injectable()
export class CreateVehicleService {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
  ) { }

  async execute(data: CreateVehicleDto): Promise<VehicleResponseDto> {
    await this.validateExistingVehicle(data);

    const vehicle = this.vehicleRepository.create({
      brand: data.marca,
      chassi: data.chassi,
      color: data.cor,
      currentMileage: data.km_atual,
      licensePlate: data.placa,
      model: data.modelo,
      observations: data.observacao,
      renavam: data.renavam,
      year: data.ano,
      customerId: data.userId,
    });
    const savedVehicle = await this.vehicleRepository.save(vehicle);
    
    return {
      id: savedVehicle.id,
      placa: savedVehicle.licensePlate,
      modelo: savedVehicle.model,
      marca: savedVehicle.brand,
      km_atual: savedVehicle.currentMileage,
      renavam: savedVehicle.renavam,
      chassi: savedVehicle.chassi,
      cor: savedVehicle.color,
      ano: savedVehicle.year,
      observacao: savedVehicle.observations,
      userId: savedVehicle.customerId,
      createdAt: savedVehicle.createdAt,
      updatedAt: savedVehicle.updatedAt,
    };
  }

  private async validateExistingVehicle(data: CreateVehicleDto): Promise<void> {
    await this.validateExistingPlate(data.placa);
    await this.validateExistingChassis(data.chassi);
    await this.validateExistingRenavam(data.renavam);
  }

  private async validateExistingPlate(licensePlate: string): Promise<void> {
    const existingVehicle = await this.vehicleRepository.findOne({
      where: {
        licensePlate,
      }
    });
    if (existingVehicle) {
      throw new ConflictException("Já existe um veículo cadastrado com essa placa.");
    }
  }

  private async validateExistingChassis(chassi: string): Promise<void> {
    if (!chassi) return;
    const existingVehicle = await this.vehicleRepository.findOne({
      where: {
        chassi,
      }
    });
    if (existingVehicle) {
      throw new ConflictException("Já existe um veículo cadastrado com esse chassi.");
    }
  }

  private async validateExistingRenavam(renavam: string): Promise<void> {
    if (!renavam) return;
    const existingVehicle = await this.vehicleRepository.findOne({
      where: {
        renavam,
      }
    });
    if (existingVehicle) {
      throw new ConflictException("Já existe um veículo cadastrado com esse renavam.");
    }
  }
}
import { Expose } from "class-transformer";
import { Vehicle } from "src/infra/entities/vehicle/vehicle.entity";

export class VehicleResponseDto {
  @Expose() id?: number;
  @Expose() placa: string;
  @Expose() modelo: string;
  @Expose() marca: string;
  @Expose() km_atual: number;
  @Expose() renavam: string;
  @Expose() chassi: string;
  @Expose() cor: string;
  @Expose() ano: number;
  @Expose() observacao: string;
  @Expose() userId: string;
  @Expose() createdAt?: Date;
  @Expose() updatedAt?: Date;

  static toDto(vehicle: Vehicle): VehicleResponseDto {
    return {
      id: vehicle.id,
      placa: vehicle.licensePlate,
      modelo: vehicle.model,
      marca: vehicle.brand,
      km_atual: vehicle.currentMileage,
      renavam: vehicle.renavam,
      chassi: vehicle.chassi,
      cor: vehicle.color,
      ano: vehicle.year,
      observacao: vehicle.observations,
      userId: vehicle.customerId,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    };
  }
}
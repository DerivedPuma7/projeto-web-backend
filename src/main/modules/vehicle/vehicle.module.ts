import { Module } from '@nestjs/common';
import { VehicleController } from 'src/application/controllers/vehicle/vehicle.controller';
import { CreateVehicleService } from 'src/domain/vehicle/use-cases/create-vehicle.service';
import { VehicleRepository } from 'src/infra/repositories/vehicle.repository';

@Module({
  imports: [],
  controllers: [VehicleController],
  providers: [
    CreateVehicleService,
    VehicleRepository,
  ],
})
export class VehicleModule { }

import { Module } from '@nestjs/common';
import { VehicleController } from 'src/application/controllers/vehicle/vehicle.controller';
import { CreateVehicleService } from 'src/domain/vehicle/use-cases/create-vehicle.service';
import { DeleteVehicleService } from 'src/domain/vehicle/use-cases/delete-vehicle.service';
import { GetAllVehiclesService } from 'src/domain/vehicle/use-cases/get-all-vehicles.service';
import { GetVehicleByIdService } from 'src/domain/vehicle/use-cases/get-vehicle-by-id.service';
import { UpdateVehicleService } from 'src/domain/vehicle/use-cases/update-vehicle.service';
import { VehicleRepository } from 'src/infra/repositories/vehicle.repository';

@Module({
  imports: [],
  controllers: [VehicleController],
  providers: [
    VehicleRepository,
    CreateVehicleService,
    GetAllVehiclesService,
    DeleteVehicleService,
    GetVehicleByIdService,
    UpdateVehicleService,
  ],
})
export class VehicleModule { }

import { CreateVehicleResponseDto } from "../../vehicle/dtos/crete-vehicle.dto";

export class GetCustomerByIdResponseDto {
  id: number;
  user: string;
  vehicles: CreateVehicleResponseDto[];
}
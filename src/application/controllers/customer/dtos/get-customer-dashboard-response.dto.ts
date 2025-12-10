import { GetCustomerByIdResponseDto } from "./get-customer-by-id-response.dto";
import { CreateVehicleResponseDto } from "../../vehicle/dtos/crete-vehicle.dto";

export class GetCustomerDashboardResponseDto {
  veiculos: CreateVehicleResponseDto[];
  orcamentoAguardandoAprovacao: any[];
  outrosOrcamentos: any[];
}
import { Module } from '@nestjs/common';
import { ServiceOrderController } from 'src/application/controllers/service-order/service-order.controller';
import { CreateServiceOrderService } from 'src/domain/service-order/use-cases/create-service-order.service';
import { GetAllServiceOrdersService } from 'src/domain/service-order/use-cases/get-all-service-orders.service';
import { GetServiceOrderByIdService } from 'src/domain/service-order/use-cases/get-service-order-by-id.service';
import { UpdateServiceOrderService } from 'src/domain/service-order/use-cases/update-service-order.service';
import { DeleteServiceOrderService } from 'src/domain/service-order/use-cases/delete-service-order.service';
import { VehicleModule } from '../vehicle/vehicle.module';
import { ServiceOrderRepository } from 'src/infra/repositories/service-order.repository';
import { VehicleRepository } from 'src/infra/repositories/vehicle.repository';

@Module({
  imports: [],
  controllers: [ServiceOrderController],
  providers: [
    ServiceOrderRepository,
    VehicleRepository,
    CreateServiceOrderService,
    GetAllServiceOrdersService,
    GetServiceOrderByIdService,
    UpdateServiceOrderService,
    DeleteServiceOrderService,
  ],
  exports: [ServiceOrderRepository],
})
export class ServiceOrderModule { }

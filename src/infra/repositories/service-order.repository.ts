import { dataSource } from "../database/datasource.config";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ServiceOrder } from "../entities/service-order/service-order.entity";

@Injectable()
export class ServiceOrderRepository extends Repository<ServiceOrder> {
  constructor() {
    super(ServiceOrder, dataSource.createEntityManager());
  }
}

import { Vehicle } from "../entities/vehicle/vehicle.entity";
import { dataSource } from "../database/datasource.config";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class VehicleRepository extends Repository<Vehicle> {
  constructor() {
    super(Vehicle, dataSource.createEntityManager());
  }
}
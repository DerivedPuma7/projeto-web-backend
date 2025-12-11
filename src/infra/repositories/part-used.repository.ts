import { dataSource } from "../database/datasource.config";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { PartUsed } from "../entities/part-used/part-used.entity";

@Injectable()
export class PartUsedRepository extends Repository<PartUsed> {
  constructor() {
    super(PartUsed, dataSource.createEntityManager());
  }
}
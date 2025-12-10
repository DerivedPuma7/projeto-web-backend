import { Part } from "../entities/part/part.entity";
import { dataSource } from "../database/datasource.config";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PartRepository extends Repository<Part> {
  constructor() {
    super(Part, dataSource.createEntityManager());
  }
}
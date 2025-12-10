import { Column, Entity } from "typeorm";
import { BaseOrmEntity } from "../base-orm-entity";

@Entity('part')
export class Part extends BaseOrmEntity {
  constructor() {
    super();
  }

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 50, nullable: true })
  code: string;

  @Column({ length: 100, nullable: true })
  brand: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  unitPrice: number;

  @Column({ type: 'int', default: 0 })
  currentStock: number;
}
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseOrmEntity } from "../base-orm-entity";
import { Customer } from "../customer/customer.entity";

@Entity('vehicle')
export class Vehicle extends BaseOrmEntity {
  constructor() {
    super();
  }

  @Column({ nullable: false, unique: true, length: 12 })
  licensePlate: string;

  @Column({ nullable: true, length: 100 })
  model: string;

  @Column({ nullable: true, length: 50 })
  brand: string;

  @Column({ nullable: true, type: 'int' })
  year: number;

  @Column({ nullable: true, type: 'int' })
  currentMileage: number;

  @Column({ nullable: true, unique: true, length: 32 })
  renavam: string;

  @Column({ nullable: true, unique: true, length: 64 })
  chassi: string;

  @Column({ nullable: true, length: 30 })
  color: string;

  @Column({ nullable: true, type: 'text' })
  observations: string;

  @ManyToOne(() => Customer, (customer) => customer.vehicles)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column({ nullable: false })
  customerId: string;
}
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { BaseOrmEntity } from "../base-orm-entity";
import { Wallet } from "../transaction/wallet.entity";
import { Vehicle } from "../vehicle/vehicle.entity";

@Entity('customer')
export class Customer extends BaseOrmEntity {
  constructor() {
    super();
  }

  @Column({ nullable: false })
  user: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.customer)
  vehicles: Vehicle[];

  @Column({ nullable: false })
  password: string;
}
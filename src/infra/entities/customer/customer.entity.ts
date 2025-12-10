import { Column, Entity, OneToOne } from "typeorm";
import { BaseOrmEntity } from "../base-orm-entity";
import { Wallet } from "../transaction/wallet.entity";

@Entity('customer')
export class Customer extends BaseOrmEntity {
  constructor() {
    super();
  }

  @Column({ nullable: false })
  user: string;

  @OneToOne(() => Wallet, (wallet) => wallet.customer)
  wallet: Wallet;

  @Column({ nullable: false })
  password: string;
}
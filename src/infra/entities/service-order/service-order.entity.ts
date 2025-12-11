import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseOrmEntity } from "../base-orm-entity";
import { Vehicle } from "../vehicle/vehicle.entity";
import { ServiceOrderStatus } from "./enums/service-order-status.enum";
import { PartUsed } from "../part-used/part-used.entity";

@Entity('service_order')
export class ServiceOrder extends BaseOrmEntity {
  constructor() {
    super();
  }

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.serviceOrders)
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column({ nullable: false })
  vehicleId: number;

  @Column({
    type: 'enum',
    enum: ServiceOrderStatus,
    default: ServiceOrderStatus.OPEN
  })
  status: ServiceOrderStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  openingDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  closingDate: Date;

  @Column({ type: 'int', nullable: true })
  attendanceMileage: number;

  @Column({ type: 'text', nullable: true })
  observations: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalValue: number;

  @OneToMany(() => PartUsed, (partUsed) => partUsed.serviceOrder)
  partsUsed: PartUsed[];
}
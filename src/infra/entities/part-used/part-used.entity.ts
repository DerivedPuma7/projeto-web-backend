import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseOrmEntity } from "../base-orm-entity";
import { ServiceOrder } from "../service-order/service-order.entity";
import { Part } from "../part/part.entity";

@Entity('part_used')
export class PartUsed extends BaseOrmEntity {
  constructor() {
    super();
  }

  @ManyToOne(() => ServiceOrder, (serviceOrder) => serviceOrder.partsUsed, { 
    onDelete: 'CASCADE',
    nullable: false 
  })
  @JoinColumn({ name: 'serviceOrderId' })
  serviceOrder: ServiceOrder;

  @Column({ nullable: false })
  serviceOrderId: number;

  @ManyToOne(() => Part, { 
    onDelete: 'RESTRICT',
    nullable: false 
  })
  @JoinColumn({ name: 'partId' })
  part: Part;

  @Column({ nullable: false })
  partId: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subtotal: number;
}
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Room } from "./room.entities";
import { Tenant } from "./tenants.entities";

@Entity("bank_slips")
export class BankSlip {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 100, unique: true })
  barcode: string;

  @Column({ type: "date" })
  due_date: Date;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: "varchar",
    length: 20,
    default: "pending",
  })
  status: string;

  @Column({ type: "date", nullable: true })
  payment_date: Date;

  @Column({ type: "text", nullable: true })
  description: string;

  @ManyToOne(() => Room, (room) => room.bank_slips, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "room_id" })
  room: Room;

  @Column({ type: "uuid" })
  room_id: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.bank_slips, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "tenant_id" })
  tenant: Tenant;

  @Column({ type: "uuid" })
  tenant_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

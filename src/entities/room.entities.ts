import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Tenant } from "./tenants.entities";
import { BankSlip } from "./bank_slip.entities";

@Entity("rooms")
export class Room {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 50, unique: true })
  office: string;

  @Column({ type: "int" })
  floor: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  area: number;

  @Column({ type: "boolean", default: true })
  is_available: boolean;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  monthly_price: number;

  @OneToMany(() => Tenant, (tenant) => tenant.room)
  tenants: Tenant[];

  @OneToMany(() => BankSlip, (bankSlip) => bankSlip.room)
  bank_slips: BankSlip[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from "typeorm";
import { Tenant } from "./tenants.entities";

@Entity("rooms")
export class Room {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 50, unique: true })
  number: string;

  @Column({ type: "int" })
  floor: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  area: number;

  @Column({ type: "boolean", default: true })
  is_available: boolean;

  @OneToMany(() => Tenant, (tenant) => tenant.room)
  tenants: Tenant[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
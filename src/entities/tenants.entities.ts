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

@Entity("tenants")
export class Tenant {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 18, unique: true })
  document: string;

  @Column({ type: "varchar", length: 20 })
  phone: string;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @ManyToOne(() => Room, (room) => room.tenants, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "room_id" })
  room: Room;

  @Column({ type: "uuid" })
  room_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
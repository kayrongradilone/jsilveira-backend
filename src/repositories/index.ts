import { AppDataSource } from "../data-source";
import { BankSlip } from "../entities/bank_slip.entities";
import { Room } from "../entities/room.entities";
import { Tenant } from "../entities/tenants.entities";
import { User } from "../entities/user.entities";

export const UserRepository = () => {
  return AppDataSource.getRepository(User);
};

export const TenantRepository = () => {
  return AppDataSource.getRepository(Tenant);
};

export const RoomRepository = () => {
  return AppDataSource.getRepository(Room);
};

export const BankSlipRepository = () => {
  return AppDataSource.getRepository(BankSlip);
};

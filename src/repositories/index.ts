import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entities";

export const UserRepository = () => {
  return AppDataSource.getRepository(User);
};
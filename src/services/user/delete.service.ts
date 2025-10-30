import { UserRepository } from "../../repositories";
import { AppError } from "../../errors/appError";

const DeleteUserService = async (userId: string) => {
  const userRepo = UserRepository();

  const user = await userRepo
    .createQueryBuilder("user")
    .where("user.id = :id", { id: userId })
    .select(["user.id", "user.name", "user.is_active", "user.email"])
    .getOne();

  if (!user) {
    throw new AppError(404, "Usuário não encontrado");
  }

  await userRepo.delete(user.id);

  return { message: "Usuário deletado com sucesso" };
};

export default DeleteUserService;

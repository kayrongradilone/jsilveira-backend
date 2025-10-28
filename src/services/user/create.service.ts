import bcryptjs from "bcryptjs";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entities";
import { UserRepository } from "../../repositories";

type IUserCreate = {
  name: string;
  email: string;
  password: string;
};

const CreateUserService = async ({
  name,
  email,
  password,
}: IUserCreate) => {
  const userRepo = UserRepository();

  const userExist = await userRepo
    .createQueryBuilder("user")
    .where("email = :email", { email })
    .select(["user.id", "user.name", "user.email"])
    .getOne();

  if (userExist) {
    throw new AppError(400, "Usuário já existe!");
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = bcryptjs.hashSync(password, 10);

  user.created_at = new Date();
  user.updated_at = new Date();

  await userRepo.save(user);

  return {
    ...user,
    password: undefined,
    updated_at: undefined,
  };
};

export default CreateUserService;

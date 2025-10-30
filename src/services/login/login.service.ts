import { AppError } from "../../errors/appError";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../repositories";

const LoginService = async (email: string, password: string) => {
  
  if (!process.env.JWT_SECRET) {
    throw new AppError(500, "JWT_SECRET não configurado");
  }

  const userRepo = await UserRepository()
    .createQueryBuilder("user")
    .where("user.email = :email", { email: email })
    .select(["user.id", "user.email", "user.password", "user.is_active"])
    .getOne();


  if (!userRepo) {
    throw new AppError(401, "Email/senha incorreto(s)");
  }

  if (!userRepo.is_active) {
    throw new AppError(400, "Usuário desativado!");
  }

  if (!bcryptjs.compareSync(password, userRepo.password)) {
    throw new AppError(401, "Email/senha incorreto(s)");
  }

  const token = jwt.sign(
    { email: email, id: userRepo.id },
    process.env.JWT_SECRET,
    { expiresIn: "6h" }
  );

  return token;
};
export default LoginService;

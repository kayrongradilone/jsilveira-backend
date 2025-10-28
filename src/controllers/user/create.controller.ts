import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import CreateUserService from "../../services/user/create.service";

const CreateUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } =
      req.body;

    const response = await CreateUserService({
      name,
      email,
      password,
    });

    return res.status(201).json({ response });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default CreateUserController;

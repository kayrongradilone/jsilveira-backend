import { AppError, handleError } from "../../errors/appError";
import { Request, Response } from "express";
import LoginService from "../../services/login/login.service";

const LoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(400, "Email e senha são obrigatórios");
    }

    const token = await LoginService(email, password);

    return res.status(200).json({ token });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    } else {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
};
export default LoginController;

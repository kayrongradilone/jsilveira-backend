import { AppError, handleError } from "../../errors/appError";
import { Request, Response } from "express";
import LoginService from "../../services/login/login.service";

const LoginController = async (req: Request, res: Response) => {
  try {
    console.log("=== LOGIN CONTROLLER ===");
    console.log("Body recebido:", req.body);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      throw new AppError(400, "Email e senha são obrigatórios");
    }

    console.log("Chamando LoginService...");
    const token = await LoginService(email, password);
    
    console.log("Token gerado com sucesso");
    return res.status(200).json({ token });
  } catch (err) {
    console.error("Erro no LoginController:", err);
    
    if (err instanceof AppError) {
      handleError(err, res);
    } else {
      return res.status(500).json({ 
        status: "error",
        message: "Internal server error",
        error: err instanceof Error ? err.message : "Unknown error"
      });
    }
  }
};
export default LoginController;

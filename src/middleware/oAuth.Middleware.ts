import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const oAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token inválido" });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          return res
            .status(401)
            .json({ message: "Token inválido ou expirado" });
        }

        req.userId = decoded.id;
        next();
      }
    );
  } catch (err) {
    return res.status(401).json({ message: "Erro na autenticação" });
  }
};

export default oAuthMiddleware;

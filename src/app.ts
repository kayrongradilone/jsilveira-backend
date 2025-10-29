import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { AppError } from "./errors/appError";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(routes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error("Erro não tratado:", err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export default app;

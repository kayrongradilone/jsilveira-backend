import { Router } from "express";
import CreateUserController from "../controllers/user/create.controller";
import ListUsersController from "../controllers/user/list.controller"; // ← IMPORTE
import oAuthMiddleware from "../middleware/oAuth.Middleware";

export const userRoutes = Router();

userRoutes.post("/", CreateUserController);

userRoutes.get("/", oAuthMiddleware, ListUsersController); 

userRoutes.delete("/:id", oAuthMiddleware, CreateUserController); 
import { Router } from "express";
import CreateUserController from "../controllers/user/create.controller";
import ListUsersController from "../controllers/user/list.controller";
import oAuthMiddleware from "../middleware/oAuth.Middleware";
import DeleteUsersController from "../controllers/user/delete.controller";

export const userRoutes = Router();

userRoutes.post("/", CreateUserController);

userRoutes.get("/", oAuthMiddleware, ListUsersController); 

userRoutes.delete("/:id", oAuthMiddleware, DeleteUsersController); 
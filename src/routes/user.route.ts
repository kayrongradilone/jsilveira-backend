import { Router } from "express";
import CreateUserController from "../controllers/user/create.controller";

export const userRoutes = Router();

userRoutes.post("/", CreateUserController);

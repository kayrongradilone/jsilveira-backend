import { Router } from "express";
import LoginController from "../controllers/login/login.controller";

export const loginRoutes = Router();

loginRoutes.post("/", LoginController);

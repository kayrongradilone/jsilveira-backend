import { Router } from "express";
import oAuthMiddleware from "../middleware/oAuth.Middleware";
import CreateBankSlipController from "../controllers/bankSlips/create.controller";
import ListBankSlipsController from "../controllers/bankSlips/list.controller";
import SelfListBankSlipController from "../controllers/bankSlips/self.controller";
import UpdateBankSlipController from "../controllers/bankSlips/update.controller";
import MarkAsPaidController from "../controllers/bankSlips/mark-paid.controller";
import DeleteBankSlipController from "../controllers/bankSlips/delete.controller";

export const bankSlipRoutes = Router();

bankSlipRoutes.post("/", oAuthMiddleware, CreateBankSlipController);

bankSlipRoutes.get("/", oAuthMiddleware, ListBankSlipsController);

bankSlipRoutes.get("/:id", oAuthMiddleware, SelfListBankSlipController);

bankSlipRoutes.put("/:id", oAuthMiddleware, UpdateBankSlipController);

bankSlipRoutes.patch("/:id/pay", oAuthMiddleware, MarkAsPaidController);

bankSlipRoutes.delete("/:id", oAuthMiddleware, DeleteBankSlipController);

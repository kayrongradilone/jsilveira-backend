import { Router } from "express";
import oAuthMiddleware from "../middleware/oAuth.Middleware";
import CreateTenantController from "../controllers/tenant/create.controller";
import ListTenantsController from "../controllers/tenant/list.controller";
import SelfListTenantController from "../controllers/tenant/self.controller";
import UpdateTenantController from "../controllers/tenant/update.controller";
import DeleteTenantController from "../controllers/tenant/delete.controller";

export const tenantRoutes = Router();

tenantRoutes.post("/", oAuthMiddleware, CreateTenantController);

tenantRoutes.get("/", oAuthMiddleware, ListTenantsController);

tenantRoutes.get("/:id", oAuthMiddleware, SelfListTenantController);

tenantRoutes.put("/:id", oAuthMiddleware, UpdateTenantController);

tenantRoutes.delete("/:id", oAuthMiddleware, DeleteTenantController);

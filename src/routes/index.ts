import { Router } from "express";
import { userRoutes } from "./user.route";
import { loginRoutes } from "./login.route";
import { tenantRoutes } from "./tenants.route";
import { roomRoutes } from "./room.route";
import { bankSlipRoutes } from "./bank-slip.route";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/login", loginRoutes);
routes.use("/tenant", tenantRoutes);
routes.use("/room", roomRoutes);
routes.use("/bank_slip", bankSlipRoutes);

routes.use("/healthcheck", (req, res) => {
  return res.sendStatus(204);
});

export default routes;

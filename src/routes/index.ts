import { Router } from "express";
import { userRoutes } from "./user.route";
import { loginRoutes } from "./login.route";
import { tenantRoutes } from "./tenants.route";
import { roomRoutes } from "./room.route";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/login", loginRoutes);
routes.use("/tenants", tenantRoutes);
routes.use("/room", roomRoutes);



routes.use("/healthcheck", (req, res) => {
  return res.sendStatus(204);
});

export default routes;

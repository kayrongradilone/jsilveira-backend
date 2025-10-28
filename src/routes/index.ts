import { Router } from "express";
import { userRoutes } from "./user.route";
import { loginRoutes } from "./login.route";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/login", loginRoutes);

routes.use("/healthcheck", (req, res) => {
  return res.sendStatus(204);
});

export default routes;

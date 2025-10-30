import { Router } from "express";
import CreateRoomController from "../controllers/room/create.controller";
import ListRoomsController from "../controllers/room/list.controller";
import UpdateRoomController from "../controllers/room/update.controller";
import DeleteRoomController from "../controllers/room/delete.controller";
import oAuthMiddleware from "../middleware/oAuth.Middleware";
import SelfListRoomController from "../controllers/room/self.controller";

export const roomRoutes = Router();

roomRoutes.post("/", oAuthMiddleware, CreateRoomController);

roomRoutes.get("/", oAuthMiddleware, ListRoomsController);

roomRoutes.get("/:id", oAuthMiddleware, SelfListRoomController);

roomRoutes.put("/:id", oAuthMiddleware, UpdateRoomController);

roomRoutes.delete("/:id", oAuthMiddleware, DeleteRoomController);

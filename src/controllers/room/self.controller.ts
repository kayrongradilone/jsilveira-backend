import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import SelfListRoomService from "../../services/room/self.service";

const SelfListRoomController = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    if (!id) {
      throw new AppError(400, "ID da sala é obrigatório");
    }

    const room = await SelfListRoomService(id);

    return res.status(200).json(room);
  } catch (err) {

    if (err instanceof AppError) {
      return handleError(err, res);
    }

    return res.status(500).json({
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export default SelfListRoomController;

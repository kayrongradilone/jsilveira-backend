import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import DeleteRoomService from "../../services/room/delete.service";

const DeleteRoomController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError(400, "ID da sala é obrigatório");
    }

    const result = await DeleteRoomService(id);

    return res.status(200).json(result);
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

export default DeleteRoomController;

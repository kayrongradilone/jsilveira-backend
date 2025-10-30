import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import UpdateRoomService from "../../services/room/update.service";

const UpdateRoomController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { office, floor, area, monthly_price, is_available } = req.body;

    if (!id) {
      throw new AppError(400, "ID da sala é obrigatório");
    }

    const room = await UpdateRoomService({
      roomId: id,
      office,
      floor,
      area,
      monthly_price,
      is_available,
    });

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

export default UpdateRoomController;

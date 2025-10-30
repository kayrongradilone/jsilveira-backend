import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import CreateRoomService from "../../services/room/create.service";

const CreateRoomController = async (req: Request, res: Response) => {
  try {

    const { office, floor, area, monthly_price } = req.body;

    if (!office || floor === undefined) {
      throw new AppError(400, "Escritório e andar são obrigatórios");
    }

    const room = await CreateRoomService({
      office,
      floor,
      area,
      monthly_price,
    });

    return res.status(201).json(room);
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

export default CreateRoomController;

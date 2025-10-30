import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ListRoomsService from "../../services/room/list.service";

const ListRoomsController = async (req: Request, res: Response) => {
  try {

    const { page, limit, office, floor, is_available, min_price, max_price } =
      req.query;

    const result = await ListRoomsService({
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
      office: office as string,
      floor: floor ? parseInt(floor as string, 10) : undefined,
      is_available: is_available as string,
      min_price: min_price ? parseFloat(min_price as string) : undefined,
      max_price: max_price ? parseFloat(max_price as string) : undefined,
    });

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

export default ListRoomsController;

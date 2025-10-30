import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ListTenantsService from "../../services/tenant/list.service";

const ListTenantsController = async (req: Request, res: Response) => {
  try {
    const { page, limit, name, document, is_active, room_id } = req.query;

    const result = await ListTenantsService({
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
      name: name as string,
      document: document as string,
      is_active: is_active as string,
      room_id: room_id as string,
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

export default ListTenantsController;

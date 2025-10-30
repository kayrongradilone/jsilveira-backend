import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ListBankSlipsService from "../../services/bankSlip/list.service";

const ListBankSlipsController = async (req: Request, res: Response) => {
  try {

    const { page, limit, status, room_id, tenant_id, start_date, end_date } =
      req.query;

    const result = await ListBankSlipsService({
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
      status: status as string,
      room_id: room_id as string,
      tenant_id: tenant_id as string,
      start_date: start_date ? new Date(start_date as string) : undefined,
      end_date: end_date ? new Date(end_date as string) : undefined,
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("❌ Erro:", err);

    if (err instanceof AppError) {
      return handleError(err, res);
    }

    return res.status(500).json({
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export default ListBankSlipsController;
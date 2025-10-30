import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import DeleteBankSlipService from "../../services/bankSlip/delete.service";

const DeleteBankSlipController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError(400, "ID do boleto é obrigatório");
    }

    const result = await DeleteBankSlipService(id);

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

export default DeleteBankSlipController;

import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import UpdateBankSlipService from "../../services/bankSlip/update.service";

const UpdateBankSlipController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { barcode, due_date, amount, status, payment_date, description } =
      req.body;

    if (!id) {
      throw new AppError(400, "ID do boleto é obrigatório");
    }

    const bankSlip = await UpdateBankSlipService({
      bankSlipId: id,
      barcode,
      due_date: due_date ? new Date(due_date) : undefined,
      amount,
      status,
      payment_date: payment_date ? new Date(payment_date) : undefined,
      description,
    });

    return res.status(200).json(bankSlip);
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

export default UpdateBankSlipController;

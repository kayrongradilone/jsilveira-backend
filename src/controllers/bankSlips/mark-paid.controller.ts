import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import MarkAsPaidService from "../../services/bankSlip/mark-paid.service";

const MarkAsPaidController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { payment_date } = req.body;

    if (!id) {
      throw new AppError(400, "ID do boleto é obrigatório");
    }

    const bankSlip = await MarkAsPaidService({
      bankSlipId: id,
      payment_date: payment_date ? new Date(payment_date) : undefined,
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

export default MarkAsPaidController;

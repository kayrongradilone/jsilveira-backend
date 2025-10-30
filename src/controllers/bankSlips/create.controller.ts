import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import CreateBankSlipService from "../../services/bankSlip/create.service";

const CreateBankSlipController = async (req: Request, res: Response) => {
  try {
    console.log("=== CREATE BANK SLIP CONTROLLER ===");

    const { barcode, due_date, amount, room_id, tenant_id, description } =
      req.body;

    if (!barcode || !due_date || !amount || !room_id || !tenant_id) {
      throw new AppError(
        400,
        "Código de barras, data de vencimento, valor, sala e inquilino são obrigatórios"
      );
    }

    const bankSlip = await CreateBankSlipService({
      barcode,
      due_date: new Date(due_date),
      amount,
      room_id,
      tenant_id,
      description,
    });

    return res.status(201).json(bankSlip);
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

export default CreateBankSlipController;
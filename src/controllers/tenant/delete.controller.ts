import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import DeleteTenantService from "../../services/tenant/delete.service";

const DeleteTenantController = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    if (!id) {
      throw new AppError(400, "ID do inquilino é obrigatório");
    }

    const result = await DeleteTenantService(id);

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

export default DeleteTenantController;
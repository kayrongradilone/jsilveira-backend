import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import UpdateTenantService from "../../services/tenant/update.service";

const UpdateTenantController = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const { name, document, phone, room_id, is_active } = req.body;

    if (!id) {
      throw new AppError(400, "ID do inquilino é obrigatório");
    }

    const tenant = await UpdateTenantService({
      tenantId: id,
      name,
      document,
      phone,
      room_id,
      is_active,
    });

    return res.status(200).json(tenant);
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

export default UpdateTenantController;
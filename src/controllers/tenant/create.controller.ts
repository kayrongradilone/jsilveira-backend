import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import CreateTenantService from "../../services/tenant/create.service";

const CreateTenantController = async (req: Request, res: Response) => {
  try {
    const { name, document, phone, room_id } = req.body;

    if (!name || !document || !phone || !room_id) {
      throw new AppError(400, "Todos os campos são obrigatórios");
    }

    const tenant = await CreateTenantService({
      name,
      document,
      phone,
      room_id,
    });

    return res.status(201).json(tenant);
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

export default CreateTenantController;

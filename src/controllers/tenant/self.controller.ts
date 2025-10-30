import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import SelfListTenantService from "../../services/tenant/self.service";

const SelfListTenantController = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    if (!id) {
      throw new AppError(400, "ID do inquilino é obrigatório");
    }

    const tenant = await SelfListTenantService(id);

    return res.status(200).json(tenant);
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

export default SelfListTenantController;
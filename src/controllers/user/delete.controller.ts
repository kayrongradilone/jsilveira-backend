import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import DeleteUserService from "../../services/user/delete.service";

const DeleteUsersController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id; 

    if (!userId) {
      throw new AppError(400, "ID do usuário é obrigatório");
    }

    const response = await DeleteUserService(userId);

    return res.status(200).json(response);
  } catch (err) {
    
    if (err instanceof AppError) {
      return handleError(err, res);
    }
    
    return res.status(500).json({
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Unknown error"
    });
  }
};

export default DeleteUsersController;
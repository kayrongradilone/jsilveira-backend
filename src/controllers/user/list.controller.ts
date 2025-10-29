import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ListUsersService from "../../services/user/list.service";

interface UserQueryFilters {
  status?: string;
  name?: string;
  email?: string;
  page?: number;
  limit?: number;
}

const ListUsersController = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "10",
      status,
      name,
      email,
    } = req.query;

    const filters: UserQueryFilters = {
      status: status as string,
      name: name as string,
      email: email as string,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
    };

    const response = await ListUsersService(filters);

    return res.status(200).json({ response });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    } else {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default ListUsersController;

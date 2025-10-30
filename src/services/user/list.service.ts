import { UserRepository } from "../../repositories";

interface ListUsersServiceProps {
  status?: string;
  name?: string;
  email?: string;
  page?: number;
  limit?: number;
}

const ListUsersService = async ({
  page = 1,
  limit = 10,
  status,
  name,
  email,
}: ListUsersServiceProps) => {
  const userRepo = UserRepository();

  const qb = userRepo
    .createQueryBuilder("user")
    .select(["user.id", "user.name", "user.email", "user.is_active"]);

  if (status && (status === "true" || status === "false")) {
    qb.andWhere("user.is_active = :status", { status: status === "true" });
  }

  if (name && name.trim().length > 0) {
    qb.andWhere("LOWER(user.name) LIKE LOWER(:name)", { name: `%${name}%` });
  }

  if (email && email.trim().length > 0) {
    qb.andWhere("LOWER(user.email) LIKE LOWER(:email)", {
      email: `%${email}%`,
    });
  }

  const [users, total] = await qb
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: users,
  };
};

export default ListUsersService;

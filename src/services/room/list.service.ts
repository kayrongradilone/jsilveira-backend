import { RoomRepository } from "../../repositories";

interface ListRoomsDTO {
  page?: number;
  limit?: number;
  office?: string;
  floor?: number;
  is_available?: string;
  min_price?: number;
  max_price?: number;
}

const ListRoomsService = async ({
  page = 1,
  limit = 10,
  office,
  floor,
  is_available,
  min_price,
  max_price,
}: ListRoomsDTO) => {

  const roomRepo = RoomRepository();

  const qb = roomRepo
    .createQueryBuilder("room")
    .leftJoinAndSelect("room.tenants", "tenant")
    .select([
      "room.id",
      "room.office",
      "room.floor",
      "room.area",
      "room.is_available",
      "room.monthly_price",
      "room.created_at",
      "room.updated_at",
      "tenant.id",
      "tenant.name",
      "tenant.document",
      "tenant.phone",
    ]);

  if (office && office.trim().length > 0) {
    qb.andWhere("LOWER(room.office) LIKE LOWER(:office)", {
      office: `%${office}%`,
    });
  }

  if (floor !== undefined) {
    qb.andWhere("room.floor = :floor", { floor });
  }

  if (is_available && (is_available === "true" || is_available === "false")) {
    qb.andWhere("room.is_available = :is_available", {
      is_available: is_available === "true",
    });
  }

  if (min_price !== undefined) {
    qb.andWhere("room.monthly_price >= :min_price", { min_price });
  }

  if (max_price !== undefined) {
    qb.andWhere("room.monthly_price <= :max_price", { max_price });
  }

  const [rooms, total] = await qb
    .skip((page - 1) * limit)
    .take(limit)
    .orderBy("room.floor", "ASC")
    .addOrderBy("room.office", "ASC")
    .getManyAndCount();


  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: rooms,
  };
};

export default ListRoomsService;

import { TenantRepository } from "../../repositories";

interface ListTenantsDTO {
  page?: number;
  limit?: number;
  name?: string;
  document?: string;
  is_active?: string;
  room_id?: string;
}

const ListTenantsService = async ({
  page = 1,
  limit = 10,
  name,
  document,
  is_active,
  room_id,
}: ListTenantsDTO) => {
  const tenantRepo = TenantRepository();

  const qb = tenantRepo
    .createQueryBuilder("tenant")
    .leftJoinAndSelect("tenant.room", "room")
    .select([
      "tenant.id",
      "tenant.name",
      "tenant.document",
      "tenant.phone",
      "tenant.is_active",
      "tenant.room_id",
      "tenant.created_at",
      "tenant.updated_at",
      "room.id",
      "room.office",
      "room.floor",
    ]);

  if (name && name.trim().length > 0) {
    qb.andWhere("LOWER(tenant.name) LIKE LOWER(:name)", {
      name: `%${name}%`,
    });
  }

  if (document && document.trim().length > 0) {
    qb.andWhere("tenant.document LIKE :document", {
      document: `%${document}%`,
    });
  }

  if (is_active && (is_active === "true" || is_active === "false")) {
    qb.andWhere("tenant.is_active = :is_active", {
      is_active: is_active === "true",
    });
  }

  if (room_id && room_id.trim().length > 0) {
    qb.andWhere("tenant.room_id = :room_id", { room_id });
  }

  const [tenants, total] = await qb
    .skip((page - 1) * limit)
    .take(limit)
    .orderBy("tenant.created_at", "DESC")
    .getManyAndCount();

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: tenants,
  };
};

export default ListTenantsService;

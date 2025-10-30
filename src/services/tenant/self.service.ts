import { TenantRepository } from "../../repositories";
import { AppError } from "../../errors/appError";

const SelfListTenantService = async (tenantId: string) => {
  const tenantRepo = TenantRepository();

  const tenant = await tenantRepo
    .createQueryBuilder("tenant")
    .leftJoinAndSelect("tenant.room", "room")
    .where("tenant.id = :id", { id: tenantId })
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
      "room.monthly_price",
    ])
    .getOne();

  if (!tenant) {
    throw new AppError(404, "Inquilino não encontrado");
  }

  return tenant;
};

export default SelfListTenantService;

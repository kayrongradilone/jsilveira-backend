import { TenantRepository } from "../../repositories";
import { AppError } from "../../errors/appError";

interface UpdateTenantDTO {
  tenantId: string;
  name?: string;
  document?: string;
  phone?: string;
  room_id?: string;
  is_active?: boolean;
}

const UpdateTenantService = async ({
  tenantId,
  name,
  document,
  phone,
  room_id,
  is_active,
}: UpdateTenantDTO) => {

  const tenantRepo = TenantRepository();

  const tenant = await tenantRepo.findOne({
    where: { id: tenantId },
  });

  if (!tenant) {
    throw new AppError(404, "Inquilino não encontrado");
  }

  if (document && document !== tenant.document) {
    const documentExists = await tenantRepo.findOne({
      where: { document },
    });

    if (documentExists) {
      throw new AppError(400, "Já existe um inquilino com este documento");
    }
  }

  if (name !== undefined) tenant.name = name;
  if (document !== undefined) tenant.document = document;
  if (phone !== undefined) tenant.phone = phone;
  if (room_id !== undefined) tenant.room_id = room_id;
  if (is_active !== undefined) tenant.is_active = is_active;

  await tenantRepo.save(tenant);


  return tenant;
};

export default UpdateTenantService;
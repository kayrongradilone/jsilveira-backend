import { TenantRepository } from "../../repositories";
import { AppError } from "../../errors/appError";

interface CreateTenantDTO {
  name: string;
  document: string;
  phone: string;
  room_id?: string;
}

const CreateTenantService = async ({
  name,
  document,
  phone,
  room_id,
}: CreateTenantDTO) => {
  const tenantRepo = TenantRepository();

  const tenantExists = await tenantRepo.findOne({
    where: { document },
  });

  if (tenantExists) {
    throw new AppError(400, "Já existe um inquilino com este documento");
  }

  const tenant = tenantRepo.create({
    name,
    document,
    phone,
    room_id,
    is_active: true,
  });

  await tenantRepo.save(tenant);

  return tenant;
};

export default CreateTenantService;

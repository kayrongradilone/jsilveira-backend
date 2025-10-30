import { TenantRepository } from "../../repositories";
import { AppError } from "../../errors/appError";

const DeleteTenantService = async (tenantId: string) => {

  const tenantRepo = TenantRepository();

  const tenant = await tenantRepo.findOne({
    where: { id: tenantId },
  });

  if (!tenant) {
    throw new AppError(404, "Inquilino não encontrado");
  }

  await tenantRepo.delete(tenant.id);


  return { message: "Inquilino deletado com sucesso" };
};

export default DeleteTenantService;
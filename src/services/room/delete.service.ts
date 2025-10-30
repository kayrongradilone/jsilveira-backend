import { RoomRepository, TenantRepository } from "../../repositories";
import { AppError } from "../../errors/appError";

const DeleteRoomService = async (roomId: string) => {
  const roomRepo = RoomRepository();
  const tenantRepo = TenantRepository();

  const room = await roomRepo.findOne({
    where: { id: roomId },
  });

  if (!room) {
    throw new AppError(404, "Sala não encontrada");
  }

  const tenantsCount = await tenantRepo.count({
    where: { room_id: roomId },
  });

  if (tenantsCount > 0) {
    throw new AppError(
      400,
      `Não é possível deletar esta sala. Existem ${tenantsCount} inquilino(s) vinculado(s) a ela.`
    );
  }

  await roomRepo.delete(room.id);

  return { message: "Sala deletada com sucesso" };
};

export default DeleteRoomService;

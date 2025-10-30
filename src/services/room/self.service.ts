import { RoomRepository } from "../../repositories";
import { AppError } from "../../errors/appError";

const SelfListRoomService = async (roomId: string) => {
  const roomRepo = RoomRepository();

  const room = await roomRepo
    .createQueryBuilder("room")
    .leftJoinAndSelect("room.tenants", "tenant")
    .where("room.id = :id", { id: roomId })
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
      "tenant.is_active",
    ])
    .getOne();

  if (!room) {
    throw new AppError(404, "Sala não encontrada");
  }

  return room;
};

export default SelfListRoomService;

import { RoomRepository } from "../../repositories";
import { AppError } from "../../errors/appError";

interface UpdateRoomDTO {
  roomId: string;
  office?: string;
  floor?: number;
  area?: number;
  monthly_price?: number;
  is_available?: boolean;
}

const UpdateRoomService = async ({
  roomId,
  office,
  floor,
  area,
  monthly_price,
  is_available,
}: UpdateRoomDTO) => {
  const roomRepo = RoomRepository();

  const room = await roomRepo.findOne({
    where: { id: roomId },
  });

  if (!room) {
    throw new AppError(404, "Sala não encontrada");
  }

  if (office && office !== room.office) {
    const officeExists = await roomRepo.findOne({
      where: { office },
    });

    if (officeExists) {
      throw new AppError(400, "Já existe uma sala com este número/escritório");
    }
  }

  if (office !== undefined) room.office = office;
  if (floor !== undefined) room.floor = floor;
  if (area !== undefined) room.area = area;
  if (monthly_price !== undefined) room.monthly_price = monthly_price;
  if (is_available !== undefined) room.is_available = is_available;

  await roomRepo.save(room);

  return room;
};

export default UpdateRoomService;

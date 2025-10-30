import { RoomRepository } from "../../repositories";
import { AppError } from "../../errors/appError";

interface CreateRoomDTO {
  office: string;
  floor: number;
  area?: number;
  monthly_price?: number;
}

const CreateRoomService = async ({
  office,
  floor,
  area,
  monthly_price,
}: CreateRoomDTO) => {
  const roomRepo = RoomRepository();

  const roomExists = await roomRepo.findOne({
    where: { office },
  });

  if (roomExists) {
    throw new AppError(400, "Já existe uma sala com este número/escritório");
  }

  const room = roomRepo.create({
    office,
    floor,
    area,
    monthly_price,
    is_available: true,
  });

  await roomRepo.save(room);

  return room;
};

export default CreateRoomService;

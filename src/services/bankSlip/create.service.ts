import {
  BankSlipRepository,
  RoomRepository,
  TenantRepository,
} from "../../repositories";
import { AppError } from "../../errors/appError";

interface CreateBankSlipDTO {
  barcode: string;
  due_date: Date;
  amount: number;
  room_id: string;
  tenant_id: string;
  description?: string;
}

const CreateBankSlipService = async ({
  barcode,
  due_date,
  amount,
  room_id,
  tenant_id,
  description,
}: CreateBankSlipDTO) => {

  const bankSlipRepo = BankSlipRepository();
  const roomRepo = RoomRepository();
  const tenantRepo = TenantRepository();

  // Verifica se já existe boleto com esse código de barras
  const barcodeExists = await bankSlipRepo.findOne({
    where: { barcode },
  });

  if (barcodeExists) {
    throw new AppError(400, "Já existe um boleto com este código de barras");
  }

  // Verifica se a sala existe
  const room = await roomRepo.findOne({
    where: { id: room_id },
  });

  if (!room) {
    throw new AppError(404, "Sala não encontrada");
  }

  // Verifica se o inquilino existe
  const tenant = await tenantRepo.findOne({
    where: { id: tenant_id },
  });

  if (!tenant) {
    throw new AppError(404, "Inquilino não encontrado");
  }

  // Verifica se o inquilino está ativo
  if (!tenant.is_active) {
    throw new AppError(400, "Inquilino está inativo");
  }

  // Verifica se o inquilino pertence à sala informada
  if (tenant.room_id !== room_id) {
    throw new AppError(400, "Este inquilino não está associado a esta sala");
  }

  const bankSlip = bankSlipRepo.create({
    barcode,
    due_date,
    amount,
    room_id,
    tenant_id,
    description,
    status: "pending",
  });

  await bankSlipRepo.save(bankSlip);


  const createdBankSlip = await bankSlipRepo.findOne({
    where: { id: bankSlip.id },
    relations: ["room", "tenant"],
  });

  return createdBankSlip;
};

export default CreateBankSlipService;

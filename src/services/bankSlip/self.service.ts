import { BankSlipRepository } from "../../repositories";
import { AppError } from "../../errors/appError";

const SelfListBankSlipService = async (bankSlipId: string) => {
  const bankSlipRepo = BankSlipRepository();

  const bankSlip = await bankSlipRepo
    .createQueryBuilder("slip")
    .leftJoinAndSelect("slip.room", "room")
    .leftJoinAndSelect("slip.tenant", "tenant")
    .where("slip.id = :id", { id: bankSlipId })
    .select([
      "slip.id",
      "slip.barcode",
      "slip.due_date",
      "slip.amount",
      "slip.status",
      "slip.payment_date",
      "slip.description",
      "slip.created_at",
      "slip.updated_at",
      "room.id",
      "room.office",
      "room.floor",
      "room.monthly_price",
      "tenant.id",
      "tenant.name",
      "tenant.document",
      "tenant.phone",
      "tenant.is_active",
    ])
    .getOne();

  if (!bankSlip) {
    throw new AppError(404, "Boleto não encontrado");
  }

  return bankSlip;
};

export default SelfListBankSlipService;

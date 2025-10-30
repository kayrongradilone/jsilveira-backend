import { BankSlipRepository } from "../../repositories";
import { AppError } from "../../errors/appError";

interface MarkAsPaidDTO {
  bankSlipId: string;
  payment_date?: Date;
}

const MarkAsPaidService = async ({
  bankSlipId,
  payment_date,
}: MarkAsPaidDTO) => {
  const bankSlipRepo = BankSlipRepository();

  const bankSlip = await bankSlipRepo.findOne({
    where: { id: bankSlipId },
    relations: ["room", "tenant"],
  });

  if (!bankSlip) {
    throw new AppError(404, "Boleto não encontrado");
  }

  if (bankSlip.status === "paid") {
    throw new AppError(400, "Este boleto já foi pago");
  }

  bankSlip.status = "paid";
  bankSlip.payment_date = payment_date || new Date();

  await bankSlipRepo.save(bankSlip);

  return bankSlip;
};

export default MarkAsPaidService;

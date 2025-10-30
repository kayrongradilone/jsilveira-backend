import { BankSlipRepository } from "../../repositories";
import { AppError } from "../../errors/appError";

const DeleteBankSlipService = async (bankSlipId: string) => {
  const bankSlipRepo = BankSlipRepository();

  const bankSlip = await bankSlipRepo.findOne({
    where: { id: bankSlipId },
  });

  if (!bankSlip) {
    throw new AppError(404, "Boleto não encontrado");
  }

  if (bankSlip.status === "paid") {
    throw new AppError(400, "Não é possível deletar um boleto já pago");
  }

  await bankSlipRepo.delete(bankSlip.id);

  console.log("✓ Boleto deletado:", bankSlip.id);

  return { message: "Boleto deletado com sucesso" };
};

export default DeleteBankSlipService;

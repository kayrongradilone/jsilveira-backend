import { BankSlipRepository } from "../../repositories";
import { AppError } from "../../errors/appError";

interface UpdateBankSlipDTO {
  bankSlipId: string;
  barcode?: string;
  due_date?: Date;
  amount?: number;
  status?: string;
  payment_date?: Date;
  description?: string;
}

const UpdateBankSlipService = async ({
  bankSlipId,
  barcode,
  due_date,
  amount,
  status,
  payment_date,
  description,
}: UpdateBankSlipDTO) => {
  const bankSlipRepo = BankSlipRepository();

  const bankSlip = await bankSlipRepo.findOne({
    where: { id: bankSlipId },
  });

  if (!bankSlip) {
    throw new AppError(404, "Boleto não encontrado");
  }

  // Se está alterando o código de barras, verifica se já existe outro boleto com ele
  if (barcode && barcode !== bankSlip.barcode) {
    const barcodeExists = await bankSlipRepo.findOne({
      where: { barcode },
    });

    if (barcodeExists) {
      throw new AppError(400, "Já existe um boleto com este código de barras");
    }
  }

  // Validação: se o status for "paid", deve ter data de pagamento
  if (status === "paid" && !payment_date && !bankSlip.payment_date) {
    throw new AppError(
      400,
      "Data de pagamento é obrigatória para boletos pagos"
    );
  }

  // Validação: não permitir alterar boleto já pago
  if (bankSlip.status === "paid" && status && status !== "paid") {
    throw new AppError(
      400,
      "Não é possível alterar o status de um boleto já pago"
    );
  }

  // Atualiza apenas os campos enviados
  if (barcode !== undefined) bankSlip.barcode = barcode;
  if (due_date !== undefined) bankSlip.due_date = due_date;
  if (amount !== undefined) bankSlip.amount = amount;
  if (status !== undefined) bankSlip.status = status;
  if (payment_date !== undefined) bankSlip.payment_date = payment_date;
  if (description !== undefined) bankSlip.description = description;

  // Se mudou para "paid" e não tinha data de pagamento, define hoje
  if (status === "paid" && !bankSlip.payment_date) {
    bankSlip.payment_date = new Date();
  }

  await bankSlipRepo.save(bankSlip);

  console.log("✓ Boleto atualizado:", bankSlip.id);

  const updatedBankSlip = await bankSlipRepo.findOne({
    where: { id: bankSlip.id },
    relations: ["room", "tenant"],
  });

  return updatedBankSlip;
};

export default UpdateBankSlipService;

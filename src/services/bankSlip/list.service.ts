import { BankSlipRepository } from "../../repositories";

interface ListBankSlipsDTO {
  page?: number;
  limit?: number;
  status?: string;
  room_id?: string;
  tenant_id?: string;
  start_date?: Date;
  end_date?: Date;
}

const ListBankSlipsService = async ({
  page = 1,
  limit = 10,
  status,
  room_id,
  tenant_id,
  start_date,
  end_date,
}: ListBankSlipsDTO) => {
  const bankSlipRepo = BankSlipRepository();

  const qb = bankSlipRepo
    .createQueryBuilder("slip")
    .leftJoinAndSelect("slip.room", "room")
    .leftJoinAndSelect("slip.tenant", "tenant")
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
      "tenant.id",
      "tenant.name",
      "tenant.document",
    ]);

  if (status && status.trim().length > 0) {
    qb.andWhere("slip.status = :status", { status });
  }

  if (room_id && room_id.trim().length > 0) {
    qb.andWhere("slip.room_id = :room_id", { room_id });
  }

  if (tenant_id && tenant_id.trim().length > 0) {
    qb.andWhere("slip.tenant_id = :tenant_id", { tenant_id });
  }

  if (start_date && end_date) {
    qb.andWhere("slip.due_date BETWEEN :start_date AND :end_date", {
      start_date,
      end_date,
    });
  } else if (start_date) {
    qb.andWhere("slip.due_date >= :start_date", { start_date });
  } else if (end_date) {
    qb.andWhere("slip.due_date <= :end_date", { end_date });
  }

  const [bankSlips, total] = await qb
    .skip((page - 1) * limit)
    .take(limit)
    .orderBy("slip.due_date", "DESC")
    .getManyAndCount();

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: bankSlips,
  };
};

export default ListBankSlipsService;

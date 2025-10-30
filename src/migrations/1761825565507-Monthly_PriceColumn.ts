import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMonthlyPriceToRooms1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rooms" ADD "monthly_price" numeric(10,2)`
    );

    await queryRunner.query(
      `UPDATE "rooms" SET "monthly_price" = 0.00 WHERE "monthly_price" IS NULL`
    );

    await queryRunner.query(
      `ALTER TABLE "rooms" ALTER COLUMN "monthly_price" SET NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "monthly_price"`);
  }
}
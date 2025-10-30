import { MigrationInterface, QueryRunner } from "typeorm";

export class BankSlipsEntity1761828871203 implements MigrationInterface {
    name = 'BankSlipsEntity1761828871203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bank_slips" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "barcode" character varying(100) NOT NULL, "due_date" date NOT NULL, "amount" numeric(10,2) NOT NULL, "status" character varying(20) NOT NULL DEFAULT 'pending', "payment_date" date, "description" text, "room_id" uuid NOT NULL, "tenant_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_142b97c449b3e93e396655296af" UNIQUE ("barcode"), CONSTRAINT "PK_08dcd18e367b5204edbaa3a28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bank_slips" ADD CONSTRAINT "FK_9b2df923f7284dcd0d7f17552f7" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_slips" ADD CONSTRAINT "FK_3ec3e8d54cc538532f496e1f028" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_slips" DROP CONSTRAINT "FK_3ec3e8d54cc538532f496e1f028"`);
        await queryRunner.query(`ALTER TABLE "bank_slips" DROP CONSTRAINT "FK_9b2df923f7284dcd0d7f17552f7"`);
        await queryRunner.query(`DROP TABLE "bank_slips"`);
    }

}

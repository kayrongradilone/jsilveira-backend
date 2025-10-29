import { MigrationInterface, QueryRunner } from "typeorm";

export class TenantsRooms1761740629501 implements MigrationInterface {
    name = 'TenantsRooms1761740629501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "office" character varying(50) NOT NULL, "floor" integer NOT NULL, "area" numeric(10,2), "is_available" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_dc7a16235059443e6b124d36293" UNIQUE ("office"), CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tenants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "document" character varying(18) NOT NULL, "phone" character varying(20) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "room_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7af15a17ea82d41910b3aef3637" UNIQUE ("document"), CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD CONSTRAINT "FK_88fa02383011b2daa03552941ed" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "FK_88fa02383011b2daa03552941ed"`);
        await queryRunner.query(`DROP TABLE "tenants"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class InicialMigration1673373123887 implements MigrationInterface {
    name = 'InicialMigration1673373123887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "district" character varying(120) NOT NULL, "zipCode" character varying(50) NOT NULL, "number" character varying NOT NULL, "city" character varying(90) NOT NULL, "state" character varying(70) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animal_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, CONSTRAINT "PK_c4dd2b1389ccbade422c3d9a2f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "procedure" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "type" character varying(50) NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_9888785b528492e7539d96e3894" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medicine" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "class" character varying(70) NOT NULL, "description" character varying NOT NULL, "treatmentId" uuid, CONSTRAINT "PK_b9e0e6f37b7cadb5f402390928b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "treatment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_5ed256f72665dee35f8e47b416e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "procedure_schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "hour" TIME NOT NULL, "procedureId" uuid, "doctorId" uuid, "treatmentId" uuid, CONSTRAINT "REL_f78fb1b64fa9f1d0a2225b3d7d" UNIQUE ("procedureId"), CONSTRAINT "PK_ab84a0050996c4e2ca2734f39cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(70) NOT NULL, "email" character varying(70) NOT NULL, "password" character varying(120) NOT NULL, "crmv" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, CONSTRAINT "UQ_62069f52ebba471c91de5d59d61" UNIQUE ("email"), CONSTRAINT "REL_ad816aa66aa42fad408b1b7d76" UNIQUE ("addressId"), CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consults" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" character varying(120) NOT NULL, "animal" character varying NOT NULL, "doctorId" uuid, "treatmentId" uuid, CONSTRAINT "REL_5dec29de0a7363eefad6f3fa7a" UNIQUE ("treatmentId"), CONSTRAINT "PK_f1dfb48f1617b7b774fd4da7a97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(70) NOT NULL, "email" character varying(70) NOT NULL, "password" character varying(120) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vaccines" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "date_aplication" date NOT NULL, "description" character varying NOT NULL, "animalsId" uuid, CONSTRAINT "PK_195bc56fe32c08445078655ec5a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(70) NOT NULL, "weigth" character varying NOT NULL, "size" character varying NOT NULL, "birth_date" date NOT NULL, "first_visit" TIMESTAMP NOT NULL DEFAULT now(), "last_visit" TIMESTAMP NOT NULL DEFAULT now(), "typeId" uuid, "vaccinesId" uuid, "ownerIdId" uuid, CONSTRAINT "PK_6154c334bbb19186788468bce5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "medicine" ADD CONSTRAINT "FK_bbbe076734c2a4150888b0377d4" FOREIGN KEY ("treatmentId") REFERENCES "treatment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "procedure_schedule" ADD CONSTRAINT "FK_f78fb1b64fa9f1d0a2225b3d7d0" FOREIGN KEY ("procedureId") REFERENCES "procedure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "procedure_schedule" ADD CONSTRAINT "FK_bfcc32b9c7309c2c06a5bcf8e54" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "procedure_schedule" ADD CONSTRAINT "FK_1e5578caecb74bc212a60e20a07" FOREIGN KEY ("treatmentId") REFERENCES "treatment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "FK_ad816aa66aa42fad408b1b7d762" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consults" ADD CONSTRAINT "FK_38b3816a560fa09d1d7ea2a23db" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consults" ADD CONSTRAINT "FK_5dec29de0a7363eefad6f3fa7a0" FOREIGN KEY ("treatmentId") REFERENCES "treatment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vaccines" ADD CONSTRAINT "FK_5b2cc4851d713869d67242435c4" FOREIGN KEY ("animalsId") REFERENCES "animals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_3ac329903282a1b1aca44f76505" FOREIGN KEY ("typeId") REFERENCES "animal_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_43b61afa26012ec50248b919b55" FOREIGN KEY ("vaccinesId") REFERENCES "vaccines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_3d690411ba73a2f51c225a06d7e" FOREIGN KEY ("ownerIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_3d690411ba73a2f51c225a06d7e"`);
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_43b61afa26012ec50248b919b55"`);
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_3ac329903282a1b1aca44f76505"`);
        await queryRunner.query(`ALTER TABLE "vaccines" DROP CONSTRAINT "FK_5b2cc4851d713869d67242435c4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "consults" DROP CONSTRAINT "FK_5dec29de0a7363eefad6f3fa7a0"`);
        await queryRunner.query(`ALTER TABLE "consults" DROP CONSTRAINT "FK_38b3816a560fa09d1d7ea2a23db"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "FK_ad816aa66aa42fad408b1b7d762"`);
        await queryRunner.query(`ALTER TABLE "procedure_schedule" DROP CONSTRAINT "FK_1e5578caecb74bc212a60e20a07"`);
        await queryRunner.query(`ALTER TABLE "procedure_schedule" DROP CONSTRAINT "FK_bfcc32b9c7309c2c06a5bcf8e54"`);
        await queryRunner.query(`ALTER TABLE "procedure_schedule" DROP CONSTRAINT "FK_f78fb1b64fa9f1d0a2225b3d7d0"`);
        await queryRunner.query(`ALTER TABLE "medicine" DROP CONSTRAINT "FK_bbbe076734c2a4150888b0377d4"`);
        await queryRunner.query(`DROP TABLE "animals"`);
        await queryRunner.query(`DROP TABLE "vaccines"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "consults"`);
        await queryRunner.query(`DROP TABLE "doctors"`);
        await queryRunner.query(`DROP TABLE "procedure_schedule"`);
        await queryRunner.query(`DROP TABLE "treatment"`);
        await queryRunner.query(`DROP TABLE "medicine"`);
        await queryRunner.query(`DROP TABLE "procedure"`);
        await queryRunner.query(`DROP TABLE "animal_types"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}

import { hashSync } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  OneToMany,
  BeforeUpdate,
} from "typeorm";
import { Address } from "../address/address.entity";
import { Consults } from "../consults/consults.entity";
import { ProcedureSchedule } from "../procedure_schedule/procedure_schedule.entity";

@Entity("doctors")
export class Doctors {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 70 })
  name: string;

  @Column({ unique: true, length: 70 })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column({ nullable: false })
  crmmv: number;

  @BeforeInsert()
  @CreateDateColumn()
  createdAt: Date;

  @BeforeUpdate()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(
    () => ProcedureSchedule,
    (procedureSchedule) => procedureSchedule.doctor
  )
  procedures_schedules: ProcedureSchedule[];

  @OneToMany(() => Consults, (consults) => consults.doctor)
  @JoinColumn()
  consults: Consults[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}

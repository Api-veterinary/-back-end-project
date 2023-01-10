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
  ManyToMany,
  ManyToOne,
  BeforeUpdate,
} from "typeorm";
import { Address } from "../address/address.entity";
import { Consults } from "../consults/consults.entity";
import { ProcedureSchedule } from "../procedure_schedule/procedure_schedule.entity";
import { Users } from "../users/users.entity";
import { Vaccines } from "../vaccines/vaccines.entity";

@Entity("animals")
export class Animals {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 70 })
  name: string;

  @Column({ unique: true, length: 70 })
  email: string;

  @Column({ length: 120 })
  password: string;

  @BeforeInsert()
  @CreateDateColumn()
  createdAt: Date;

  @BeforeUpdate()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Vaccines, (vaccines) => vaccines.animals)
  @JoinColumn()
  vaccines: Vaccines;

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

  @ManyToOne(() => Users, (users) => users.animals)
  @JoinColumn()
  owner_id: Users;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}

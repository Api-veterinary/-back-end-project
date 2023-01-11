import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Medicine } from "../medicines/medicines.enttity";
import { ProcedureSchedule } from "../procedure_schedule/procedure_schedule.entity";

@Entity("treatment")
export class Treatment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120, nullable: false })
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Medicine)
  @JoinTable()
  medicines: Medicine[];

  @OneToMany(
    () => ProcedureSchedule,
    (procedureSchedule) => procedureSchedule.treatment
  )
  @JoinColumn()
  procedures: ProcedureSchedule[];
}

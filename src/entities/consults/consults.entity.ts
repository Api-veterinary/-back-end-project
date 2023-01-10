import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Animals } from "../animals/animals.entity";
import { Doctors } from "../doctors/doctors.entity";
import { Treatment } from "../treatment/treatment.entity";

@Entity("consults")
export class Consults {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date", nullable: false })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Animals, (animals) => animals.consults)
  animal: Animals;

  @ManyToOne(() => Doctors, (doctors) => doctors.consults)
  @JoinColumn()
  doctor_id: Doctors;

  @OneToOne(() => Treatment)
  @JoinColumn()
  treatment_id: Treatment;
}

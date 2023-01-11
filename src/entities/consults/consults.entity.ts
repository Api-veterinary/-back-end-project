import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Doctors } from "../doctors/doctors.entity";
import { Treatment } from "../treatment/treatment.entity";

@Entity("consults")
export class Consults {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120, nullable: false })
  date: string;

  @Column()
  animal: string;

  @ManyToOne(() => Doctors, (doctors) => doctors.consults)
  @JoinColumn()
  doctor: Doctors;

  @OneToOne(() => Treatment)
  @JoinColumn()
  treatment: Treatment;
}

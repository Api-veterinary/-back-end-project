import { hashSync } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  JoinColumn,
  OneToMany,
  ManyToOne,
  BeforeUpdate,
} from "typeorm";
import { Animal_types } from "../animalTypes/animalTypes.entity";
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

  @Column()
  weigth: string;

  @Column()
  size: string;

  @ManyToOne(() => Animal_types, (animal_types) => animal_types.animals)
  @JoinColumn()
  type: string;

  @Column({ type: "date" })
  birth_date: string;

  @BeforeInsert()
  @CreateDateColumn()
  first_visit: Date;

  @BeforeUpdate()
  @UpdateDateColumn()
  last_visit: Date;

  @ManyToOne(() => Vaccines, (vaccines) => vaccines.animals)
  @JoinColumn()
  vaccines: Vaccines;

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
}

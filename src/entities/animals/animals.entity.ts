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
import { Medicine } from "../medicines/medicines.enttity";
import { ProcedureSchedule } from "../procedure_schedule/procedure_schedule.entity";
import { Users } from "../users/users.entity";

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

  @OneToMany(() => Medicine, (vaccines) => vaccines.animals)
  @JoinColumn()
  vaccines: Medicine[];

  @OneToMany(() => Consults, (consults) => consults.animal)
  @JoinColumn()
  consults: Consults[];

  @ManyToOne(() => Users, (users) => users.animals)
  @JoinColumn()
  owner_id: Users;
}

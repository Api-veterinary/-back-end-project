import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Animals } from "../animals/animals.entity";
import { Treatment } from "../treatment/treatment.entity";

@Entity("medicine")
export class Medicine {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120, nullable: false })
  name: string;

  @Column({ length: 70, nullable: false })
  class: string;

  @Column()
  description: string;

  @ManyToOne(() => Animals, (animals) => animals.vaccines)
  animals: Animals;

  @ManyToOne(() => Treatment, (treatment) => treatment.medicines)
  treatment: Treatment;
}

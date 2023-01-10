import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Animals } from "../animals/animals.entity";
import { Treatment } from "../treatment/treatment.entity";

@Entity("vaccines")
export class Vaccines {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120, nullable: false })
  name: string;

  @Column({ type: "date" })
  date_aplication: string;

  @Column()
  description: string;

  @ManyToOne(() => Animals, (animals) => animals.vaccines)
  animals: Animals[];
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Animals } from "../animals/animals.entity";

@Entity("animal_sizes")
export class AnimalSizes {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  size: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Animals, (animals) => animals.size)
  animals: Animals[];
}

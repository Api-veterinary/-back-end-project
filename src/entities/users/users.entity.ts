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
import { Animals } from "../animals/animals.entity";

@Entity("users")
export class Users {
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

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Animals, (animals) => animals.owner_id)
  animals: Animals[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Company } from "../../company/entities/company.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  itemName: string;

  @Column()
  price: number;

  @Column()
  count: number;

  @Column({ default: 10 })
  tax: number;

  @Column()
  description: string;

  @Column()
  orderDate: Date;

  @ManyToOne(() => Company, (company) => company.orders)
  @JoinColumn({ name: "company_id" })
  company: Company;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date | null;
}

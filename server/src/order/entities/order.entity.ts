import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Company } from "../../company/entities/company.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  itemName: string; // 품목 및 규격

  @Column({ nullable: true })
  unitPrice: number; // 단가

  @Column({ nullable: true })
  price: number; // 금액

  @Column({ nullable: true })
  vat: number; // 부가세

  @Column({ nullable: true })
  count: number; // 수량

  @Column({ nullable: true })
  resultPrice: number; // 합계금액

  @Column({ nullable: true })
  receivePrice: number; // 수금

  @Column({ default: 10, nullable: true })
  tax: number; // 잔액

  @Column({ nullable: true })
  description: string; // 비고

  @Column({ nullable: true })
  orderDate: Date; // 일자

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

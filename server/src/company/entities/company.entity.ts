import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Order } from "../../order/entities/order.entity";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ceoName: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  addressNumber: string;

  @Column()
  phone: string;

  @Column()
  fax: string;

  @OneToMany(() => Order, (order) => order.company)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date | null;
}

import { Column } from "typeorm";
import { Company } from "../../company/entities/company.entity";

export class CreateOrderDto {
  code: string;

  name: string;

  itemName: string;

  price: number;

  count: number;

  tax: number;

  description: string;

  orderDate: Date;

  expectDate: Date;

  company: Company;
}

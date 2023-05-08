import { Column } from "typeorm";
import { Company } from "../../company/entities/company.entity";

export class CreateOrderDto {
  code: string;
  name: string;
  itemName: string; // 품목 및 규격
  unitPrice: number; // 단가
  price: number; // 금액
  vat: number; // 부가세
  count: number; // 수량
  resultPrice: number; // 합계금액
  resultPriceWithVat: number; // 합계금액(부가세 계산)
  receivePrice: number; // 수금
  tax: number; // 잔액
  description: string; // 비고
  orderDate: Date; // 일자
  company: Company;
}

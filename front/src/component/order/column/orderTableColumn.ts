import { DataType, HorizontalAlignment } from "devextreme/common";
import { Format } from "devextreme/localization";

interface ColumnType {
  caption?: string;
  name?: string;
  dataField?: string;
  dataType?: DataType;
  alignment?: HorizontalAlignment;
  format?: Format | string;
  cellTemplate?: (container: any, options: any) => void | undefined;
}

export const orderTableColumn: Array<ColumnType> = [
  {
    caption: "주문 접수일",
    dataField: "orderDate",
    dataType: "date",
    format: "yyyy-MM-dd",
  },
  // {
  //   caption: "등록일",
  //   dataField: "createdAt",
  //   dataType: "date",
  //   format: "yyyy-MM-dd",
  // },
  {
    caption: "주문명",
    dataField: "name",
    dataType: "string",
  },
  {
    caption: "품목명",
    dataField: "itemName",
    dataType: "string",
  },
  {
    caption: "단가",
    dataField: "unitPrice",
    dataType: "number",
  },
  {
    caption: "가격",
    dataField: "price",
    dataType: "number",
  },
  {
    caption: "부가세",
    dataField: "vat",
    dataType: "number",
  },
  {
    caption: "수량",
    dataField: "count",
    dataType: "number",
  },
  {
    caption: "수금",
    dataField: "receivePrice",
    dataType: "number",
  },
  {
    caption: "잔액",
    dataField: "tax",
    dataType: "number",
  },
  {
    caption: "합계금액",
    dataField: "resultPrice",
    dataType: "number",
  },

  {
    caption: "거래처",
    dataField: "company.name",
    dataType: "string",
  },
  // {
  //   caption: "거래처 전화번호",
  //   dataField: "company.phone",
  //   dataType: "string",
  // },
  // {
  //   caption: "거래처 우편번호",
  //   dataField: "company.addressNumber",
  //   dataType: "string",
  // },
  // {
  //   caption: "거래처 주소",
  //   dataField: "company.address",
  //   dataType: "string",
  // },
  {
    caption: "비고",
    dataField: "description",
    dataType: "number",
  },
];

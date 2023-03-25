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
    caption: "순번", // 순번
    name: "index",
    dataType: "number",
    alignment: "center",
    cellTemplate: function (container, options) {
      container.innerText = options.rowIndex + 1;
    },
  },
  {
    caption: "주문코드",
    dataField: "code",
    dataType: "string",
  },
  {
    caption: "주문명",
    dataField: "name",
    dataType: "string",
  },
  {
    caption: "거래처명",
    dataField: "Partner.name",
    dataType: "string",
  },
  {
    caption: "주문자 전화번호",
    dataField: "Customer.mobile",
    dataType: "string",
  },
  {
    caption: "주문자 우편번호",
    dataField: "Customer.zipCode",
    dataType: "string",
  },
  {
    caption: "주문자 주소",
    dataField: "Customer.address",
    dataType: "string",
  },
  {
    caption: "배송지명",
    dataField: "receiverName",
    dataType: "string",
  },
  {
    caption: "주문 접수일",
    dataField: "orderDate",
    dataType: "date",
    format: "yyyy-MM-dd",
  },
  {
    caption: "주문 담당자",
    dataField: "User.name",
  },
  {
    caption: "등록일",
    dataField: "createdAt",
    dataType: "date",
    format: "yyyy-MM-dd",
  },
];

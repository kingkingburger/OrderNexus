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
  // {
  //   caption: "순번", // 순번
  //   name: "index",
  //   dataType: "number",
  //   alignment: "center",
  //   cellTemplate: function (container, options) {
  //     container.innerText = options.rowIndex + 1;
  //   },
  // },
  {
    caption: "등록일",
    dataField: "createdAt",
    dataType: "date",
    format: "yyyy-MM-dd",
  },
  // {
  //   caption: "주문코드",
  //   dataField: "code",
  //   dataType: "string",
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
    caption: "가격",
    dataField: "price",
    dataType: "number",
  },
  {
    caption: "개수",
    dataField: "count",
    dataType: "number",
  },
  {
    caption: "비고",
    dataField: "description",
    dataType: "number",
  },
  {
    caption: "거래처명",
    dataField: "company.name",
    dataType: "string",
  },
  {
    caption: "거래처명 전화번호",
    dataField: "company.phone",
    dataType: "string",
  },
  {
    caption: "거래처명 우편번호",
    dataField: "company.addressNumber",
    dataType: "string",
  },
  {
    caption: "거래처명 주소",
    dataField: "company.address",
    dataType: "string",
  },
  {
    caption: "주문 접수일",
    dataField: "orderDate",
    dataType: "date",
    format: "yyyy-MM-dd",
  },
];

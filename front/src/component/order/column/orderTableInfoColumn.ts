import { DataType, HorizontalAlignment } from "devextreme/common";
import { Format } from "devextreme/localization";
import { Order } from "../orderTable";
import { cellCalculate } from "../../util/lib/cellCalculate";

interface ColumnType {
  caption?: string;
  name?: string;
  dataField?: string;
  dataType?: DataType;
  alignment?: HorizontalAlignment;
  format?: Format | string;
  cellTemplate?: (container: any, options: any) => void | undefined;
  groupIndex?: number;
  showWhenGrouped?: boolean;
  calculateCellValue?: (row: Order) => string | number;
}

export const orderTableInfoColumn: Array<ColumnType> = [
  {
    caption: "주문 접수일",
    dataField: "orderDate",
    dataType: "date",
    format: "yyyy-MM-dd",
    groupIndex: 1,
    showWhenGrouped: false
  },
  {
    caption: "품목명",
    dataField: "itemName",
    dataType: "string"
  },

  {
    caption: "가격",
    dataField: "price",
    dataType: "number",
    // calculateCellValue: (row) => {
    //   return cellCalculate(row, "원");
    // }
  },

  {
    caption: "수량",
    dataField: "count",
    dataType: "number",
    // calculateCellValue: (row) => {
    //   return cellCalculate(row, "개");
    // }
  },
  {
    caption: "합계금액",
    dataField: "resultPrice",
    dataType: "number",
    // calculateCellValue: (row) => {
    //   return cellCalculate(row, "원");
    // }
  },
  {
    caption: "비고",
    dataField: "description",
    dataType: "number"
  }
];

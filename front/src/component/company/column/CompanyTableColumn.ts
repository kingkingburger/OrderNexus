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

export const companyTableColumn: Array<ColumnType> = [
  {
    caption: "사업장이름",
    dataField: "name",
  },
  {
    caption: "사업자 대표이름",
    dataField: "ceoName",
  },
  {
    caption: "전화번호",
    dataField: "phone",
  },
  {
    caption: "주소",
    dataField: "address",
  },
  {
    caption: "우편번호",
    dataField: "addressNumber",
  },
  {
    caption: "이메일",
    dataField: "email",
  },
  {
    caption: "팩스번호",
    dataField: "fax",
  },
  {
    caption: "등록일",
    dataField: "createdAt",
    dataType: "date",
    format: "yyyy-MM-dd",
  },
];

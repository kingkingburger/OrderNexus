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
    caption: "순번", // 순번
    name: "index",
    dataType: "number",
    alignment: "center",
    cellTemplate: function (container, options) {
      container.innerText = options.rowIndex + 1;
    },
  },
  {
    caption: "사업장코드",
    dataField: "code",
  },
  {
    caption: "사업장이름",
    dataField: "name",
  },
  {
    caption: "전화번호",
    dataField: "phone",
  },
  {
    caption: "팩스번호",
    dataField: "fax",
  },
  {
    caption: "이메일",
    dataField: "email",
  },
  {
    caption: "등록일",
    dataField: "createdAt",
    dataType: "date",
    format: "yyyy-MM-dd",
  },
];

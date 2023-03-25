import ReactModal from "react-modal";
import { Order } from "../companyTable";
import {
  ColumnChooser,
  DataGrid,
  Editing,
  Grouping,
  GroupPanel,
} from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { orderTableColumn } from "../../order/column/orderTableColumn";
import { ColumnType } from "../../order/orderTable";

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  data: Order;
}

const CompanyInfoModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  data,
}: MyModalProps) => {
  const [column, setColumn] = useState<Array<ColumnType>>([]);

  useEffect(() => {
    const col: Array<ColumnType> = orderTableColumn;
    setColumn(col);
  }, []);

  const jsonStr2 = JSON.stringify(data, null, 2);
  const strToJson = JSON.parse(jsonStr2);
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="주문 상세"
      ariaHideApp={false}
    >
      <h1>{title}</h1>

      <DataGrid
        dataSource={strToJson}
        columns={column}
        allowColumnResizing={true}
        allowColumnReordering={true}
        hoverStateEnabled={true}
        showBorders={true}
        showColumnHeaders={true}
        showRowLines={true}
      >
        <Grouping></Grouping>
        <GroupPanel
          allowColumnDragging={true}
          visible={true}
          emptyPanelText={"여기에 그룹을 넣어주세요"}
        ></GroupPanel>
        <Editing></Editing>
        <ColumnChooser enabled={true} mode={"select"}></ColumnChooser>
      </DataGrid>

      <button onClick={onSubmit}>확인</button>
      <button onClick={onClose}>취소</button>
    </ReactModal>
  );
};

export default CompanyInfoModal;

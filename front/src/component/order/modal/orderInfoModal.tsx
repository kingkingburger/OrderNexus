import ReactModal from "react-modal";
import { ColumnType, Order } from "../orderTable";
import { ColumnChooser, DataGrid, Editing, Grouping, GroupPanel } from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { orderTableInfoColumn } from "../column/orderTableInfoColumn";

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  data: Order;
}

const OrderInfoModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  data,
}: MyModalProps) => {
  const [column, setColumn] = useState<Array<ColumnType>>([]);

  useEffect(() => {
    const col: Array<ColumnType> = orderTableInfoColumn;
    setColumn(col);
  }, []);

  const jsonStr2 = JSON.stringify(data, null, 2);
  const infoData = JSON.parse(jsonStr2) as any;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="주문 상세"
      ariaHideApp={false}
    >

      <h1>{title}</h1>

      <div>거래처 이름: {infoData?.company?.name}</div>
      <div>전화번호: {infoData?.company?.phone}</div>

      <div>거래처 사장: {infoData?.company?.ceoName}</div>
      <div>팩스번호: {infoData?.company?.fax}</div>
      <div>주소: {infoData?.company?.address}</div>
      <div>우편번호: {infoData?.company?.addressNumber}</div>

      <DataGrid
        dataSource={[infoData]}
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

export default OrderInfoModal;

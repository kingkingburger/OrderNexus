import ReactModal from "react-modal";
import { Company } from "../companyTable";
import { ColumnChooser, DataGrid, Editing, Grouping, GroupPanel } from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { orderTableInfoColumn } from "../../order/column/orderTableInfoColumn";
import { ColumnType } from "../../order/orderTable";
import CompanyUpdateModal from "./companyUpdateModal";

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  data: Company;
}

const CompanyInfoModal = ({
                            isOpen,
                            onClose,
                            onSubmit,
                            title,
                            data
                          }: MyModalProps) => {
  const [column, setColumn] = useState<Array<ColumnType>>([]);
  const [showModal, setShowModal] = useState(false);
  const [clickRow, setClickRow] = useState({} as Company);
  // update 모달열기
  const openModal = (e: any) => {
    // 클릭된 데이터 담아두기
    const jsonStr2 = JSON.stringify(data, null, 2);
    const infoData = JSON.parse(jsonStr2) as Company;
    setClickRow(infoData);
    setShowModal(true);
  };

  // 전체 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setClickRow({} as Company);
  };

  // update되었는지 확인하기 위함
  const handleUpdateChange = (newValue: boolean) => {
    // update가 되었다면 모달 닫기
    if(newValue){
      onClose();
    }
  };

  useEffect(() => {
    const col: Array<ColumnType> = orderTableInfoColumn;
    setColumn(col);
  }, []);


  const jsonStr2 = JSON.stringify(data, null, 2);
  const infoData = JSON.parse(jsonStr2) as Company;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="주문 상세"
      ariaHideApp={false}
    >

      <h1>{title}</h1>

      <div>거래처 이름: {infoData.name}</div>
      <div>전화번호: {infoData.phone}</div>

      <div>거래처 사장: {infoData.ceoName}</div>
      <div>팩스번호: {infoData.fax}</div>
      <div>주소: {infoData.address}</div>
      <div>우편번호: {infoData.addressNumber}</div>

      <button onClick={openModal}>수정</button>

      <DataGrid
        dataSource={infoData.orders}
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

      <CompanyUpdateModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={() => console.log("Submit")}
        title="거래처 주문 상세정보"
        data={clickRow}
        handleUpdateChange={handleUpdateChange}
      />

    </ReactModal>
  );
};

export default CompanyInfoModal;

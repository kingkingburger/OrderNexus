import React, { useEffect, useState } from "react";
import { ColumnChooser, DataGrid, Editing, Grouping, GroupPanel } from "devextreme-react/data-grid";
import axios from "axios";
import { DataType, HorizontalAlignment } from "devextreme/common";
import { Format } from "devextreme/localization";
import { companyTableColumn } from "./column/CompanyTableColumn";
import { dataResponse } from "../../App";
import { Container } from "react-bootstrap";
import CompanyInfoModal from "./modal/companyInfoModal";
import CompanyInsertModal from "./modal/companyInsertModal";

export interface Order {
  id?: number;
  code: string;
  name: string;
  itemName: string; // 품목 및 규격
  unitPrice: number; // 단가
  price: number; // 금액
  vat: number; // 부가세
  count: number; // 수량
  resultPrice: number; // 합계금액
  receivePrice: number; // 수금
  tax: number; // 잔액
  description: string; // 비고
  orderDate: Date; // 일자
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  company?: Company;
}

export interface Company {
  id: number;
  name: string;
  code: string;
  ceoName: string;
  email: string;
  address: string;
  addressNumber: string;
  phone: string;
  fax: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  orders?: Array<Order>;
}

interface ColumnType {
  caption?: string;
  name?: string;
  dataField?: string;
  dataType?: DataType;
  alignment?: HorizontalAlignment;
  format?: Format | string;
  cellTemplate?: (container: any, options: any) => void | undefined;
}

export const companyApi = `${process.env.REACT_APP_API_ADDRESS}/company`;

const CompanyTable = () => {
  const [row, setRow] = useState<any>([]);
  const [column, setColumn] = useState<Array<ColumnType>>([]);
  const [clickRow, setClickRow] = useState({} as Company);
  const [showModal, setShowModal] = useState(false);
  const [insertShowModal, setInsertShowModal] = useState(false);

  // info 모달열기
  const openModal = (e: any) => {
    setShowModal(true);
    setClickRow(e.data);
  };

  // insert 모달 열기
  const openInsertModal = (e: any) => {
    setInsertShowModal(true);
  };

  // 전체 모달 닫기
  const closeModal = async () => {
    setShowModal(false);
    setInsertShowModal(false);
    // 모달창이 닫히면 테이블 리랜더링
    const result = await axios.get<dataResponse>(companyApi, {
      params: {},
    });
    setRow(result.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get<dataResponse>(companyApi, {
        params: {},
      });
      setRow(result.data);

      const col: Array<ColumnType> = companyTableColumn;
      setColumn(col);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <button onClick={openInsertModal}>거래처 입력</button>
      test
      <DataGrid
        dataSource={row}
        columns={column}
        allowColumnResizing={true}
        allowColumnReordering={true}
        hoverStateEnabled={true}
        showBorders={true}
        showColumnHeaders={true}
        showRowLines={true}
        onRowClick={openModal}
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

      <CompanyInsertModal
        isOpen={insertShowModal}
        onClose={closeModal}
        onSubmit={() => console.log("Submit")}
        title="거래처 주문 입력"
        data={{} as Order}
      ></CompanyInsertModal>

      <CompanyInfoModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={() => console.log("Submit")}
        title="거래처 주문 상세정보"
        data={clickRow}
      />
    </Container>
  );
};

export default CompanyTable;

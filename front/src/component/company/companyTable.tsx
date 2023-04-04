import React, { useEffect, useState } from "react";
import {
  ColumnChooser,
  DataGrid,
  Editing,
  Grouping,
  GroupPanel,
} from "devextreme-react/data-grid";
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
  companyId?: number;
  partnerId?: number;
  quotationId?: number | null;
  partnerUserId?: number | null;
  userId?: number;
  confirmUserId?: number | null;
  customerId?: number;
  partnerCode?: string | null;
  code?: string;
  name?: string;
  orderDate?: string;
  expectedDate?: string;
  completeDate?: string | null;
  confirmDate?: string | null;
  returnDate?: string | null;
  rejectReason?: string | null;
  state?: string;
  image?: string | null;
  receiverName?: string;
  receiverAddress?: string;
  receiverZipCode?: number;
  receiverPhoneNumber?: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  Company?: Company;
}

export interface Company {
  id: number;
  name: string;
  code: string;
  ccIdCompanyType: number;
  group: any;
  registrationNumber: string | null;
  corporationNumber: string | null;
  ceoName: string | null;
  businessType: string | null;
  businessItem: string | null;
  phone: string | null;
  fax: string | null;
  email: string | null;
  homepage: string | null;
  zipCode: string | null;
  address1: string | null;
  address2: string | null;
  userId: number;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
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
export const companyApi = "http://localhost:3586/company";
export const header = {
  "access-token":
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY29tcGFueUlkIjpudWxsLCJ1c2VyaWQiOiJzeXN0ZW0iLCJuYW1lIjoi7Iuc7Iqk7YWc6rSA66as7J6QIiwiYXV0aCI6InN5c3RlbSIsImlhdCI6MTY3NTg0MDQ4MSwiZXhwIjoxOTkxNDE2NDgxfQ.Dfj9ibLc_mi5tsQ5Oo1cLh9HZ_uHcMf93pc12G4Z8js",
};
export const orderApi = "http://localhost:3586/order";
const CompanyTable = () => {
  const [row, setRow] = useState<any>([]);
  const [orderRow, setOrderRow] = useState<any>([]);
  const [column, setColumn] = useState<Array<ColumnType>>([]);
  const [clickRow, setClickRow] = useState({} as Order);
  const [showModal, setShowModal] = useState(false);
  const [insertShowModal, setInsertShowModal] = useState(false);

  //모달열기
  const openModal = (e: any) => {
    const selectRow = orderRow.filter((data: Order) => {
      return data.companyId === e.key.id;
    });
    setShowModal(true);
    setClickRow(selectRow);
  };

  const closeModal = async () => {
    setShowModal(false);
    setInsertShowModal(false);
    // 모달창이 닫히면 테이블 리랜더링
    const result = await axios.get<dataResponse>(companyApi, {
      params: {},
    });
    setRow(result.data);
  };

  const openInsertModal = (e: any) => {
    setInsertShowModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get<dataResponse>(companyApi, {
        params: {},
      });
      setRow(result.data);
      const orderResult = await axios.get<dataResponse>(orderApi, {
        params: {},
      });
      setOrderRow(orderResult.data);

      const col: Array<ColumnType> = companyTableColumn;
      setColumn(col);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <button onClick={openInsertModal}>거래처 입력</button>
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
        data={clickRow}
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

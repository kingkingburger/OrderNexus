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
import { orderTableColumn } from "../order/column/orderTableColumn";
import { dataResponse } from "../../App";
import OrderInfoModal from "../order/modal/orderInfoModal";
import Header from "../header";
import { Container } from "react-bootstrap";

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

export interface ColumnType {
  caption?: string;
  name?: string;
  dataField?: string;
  dataType?: DataType;
  alignment?: HorizontalAlignment;
  format?: Format | string;
  cellTemplate?: (container: any, options: any) => void | undefined;
}
const OrderTable = () => {
  const [row, setRow] = useState<any>([]); // 4번)
  const [column, setColumn] = useState<Array<ColumnType>>([]); // 4번)
  const [clickRow, setClickRow] = useState({} as Order);
  const [showModal, setShowModal] = useState(false);

  // const api = "http://220.90.131.48:3030/order-sheets";
  const api = "http://localhost:3030/order-sheets";
  const header = {
    "access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY29tcGFueUlkIjpudWxsLCJ1c2VyaWQiOiJzeXN0ZW0iLCJuYW1lIjoi7Iuc7Iqk7YWc6rSA66as7J6QIiwiYXV0aCI6InN5c3RlbSIsImlhdCI6MTY3NTg0MDQ4MSwiZXhwIjoxOTkxNDE2NDgxfQ.Dfj9ibLc_mi5tsQ5Oo1cLh9HZ_uHcMf93pc12G4Z8js",
  };

  //모달열기
  const openModal = (e: any) => {
    const selectRow = row.find((data: Order) => data.id === e.key.id);
    setShowModal(true);
    setClickRow(selectRow);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get<dataResponse>(api, {
        params: {},
        headers: header,
      });

      setRow(result.data.data.rows);

      const col: Array<ColumnType> = orderTableColumn;
      setColumn(col);
    };

    fetchData(); // 6번) 반드시 함수를 호출해야만 async함수가 실행되는 것 잊지말기!
  }, []);

  return (
    <Container>
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

      <OrderInfoModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={() => console.log("Submit")}
        title="Modal Title"
        data={clickRow}
      />
    </Container>
  );
};

export default OrderTable;

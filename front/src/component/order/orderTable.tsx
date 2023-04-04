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
import { Container } from "react-bootstrap";
import { companyApi } from "../company/companyTable";
import OrderInsertModal from "./modal/orderInsertModal";

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
export const orderApi = "http://localhost:3586/order";

const OrderTable = () => {
  const [row, setRow] = useState<any>([]); // 4번)
  const [column, setColumn] = useState<Array<ColumnType>>([]); // 4번)
  const [companyData, setCompanyData] = useState<any>([]); // 4번)
  const [clickRow, setClickRow] = useState({} as Order);
  const [showModal, setShowModal] = useState(false);
  const [insertShowModal, setInsertShowModal] = useState(false);

  //모달열기
  const openModal = (e: any) => {
    const selectRow = row.find((data: Order) => data.id === e.key.id);
    setShowModal(true);
    setClickRow(selectRow);
  };

  const closeModal = async () => {
    setShowModal(false);
    setInsertShowModal(false);
    const result = await axios.get<dataResponse>(orderApi, {
      params: {},
    });
    setRow(result.data);
  };

  const openInsertModal = (e: any) => {
    setInsertShowModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get<dataResponse>(orderApi, {
        params: {},
      });

      setRow(result.data);
      const col: Array<ColumnType> = orderTableColumn;
      setColumn(col);

      // 거래처 정보를 가지고옴
      const companyResult = await axios.get<dataResponse>(companyApi, {
        params: {},
      });
      setCompanyData(companyResult.data);
    };

    fetchData(); // 6번) 반드시 함수를 호출해야만 async함수가 실행되는 것 잊지말기!
  }, []);

  return (
    <Container>
      <button onClick={openInsertModal}>주문 입력</button>
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

      <OrderInsertModal
        isOpen={insertShowModal}
        onClose={closeModal}
        onSubmit={() => console.log("Submit")}
        title="주문 입력"
        data={companyData}
      ></OrderInsertModal>

      <OrderInfoModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={() => console.log("Submit")}
        title="주문 상세"
        data={clickRow}
      />
    </Container>
  );
};

export default OrderTable;

import React, { useEffect, useState } from "react";
import {
  ColumnChooser,
  DataGrid,
  Editing,
  Grouping,
  GroupPanel,
  SearchPanel,
  Summary
} from "devextreme-react/data-grid";
import axios from "axios";
import { DataType, HorizontalAlignment } from "devextreme/common";
import { Format } from "devextreme/localization";
import { orderTableColumn } from "./column/orderTableColumn";
import { dataResponse } from "../../App";
import OrderInfoModal from "../order/modal/orderInfoModal";
import { Button, Col, Container, Row } from "react-bootstrap";
import { companyApi } from "../company/companyTable";
import OrderInsertModal from "./modal/orderInsertModal";
import { Export } from "devextreme-react/chart";
import DatePickerComponent from "../util/datePick";
import { getMonthStartEndDateTime } from "../util/lib/dateRelated";

// import * as https from "https";

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
  orderDate: ""; // 일자
  Company: Company;
}

export interface Company {
  id: number;
  name: string;
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

export const orderApi = `${process.env.REACT_APP_API_ADDRESS}/order`;

const OrderTable = () => {
  const [row, setRow] = useState<any>([]); // 4번)
  const [column, setColumn] = useState<Array<ColumnType>>([]); // 4번)
  const [companyData, setCompanyData] = useState<any>([]); // 4번)
  const [clickRow, setClickRow] = useState({} as Order);
  const [showModal, setShowModal] = useState(false);
  const [insertShowModal, setInsertShowModal] = useState(false);

  // 기간설정 state
  const {monthStart, monthEnd} = getMonthStartEndDateTime()
  const [orderDateFrom, setOrderDateFrom] = useState(monthStart || "");
  const [orderDateTo, setOrderDateTo] = useState(monthEnd || "");

  const summary  = {
    groupItems: [
      {
        column: 'resultPrice',
        summaryType: 'sum',
        displayFormat: '총합group',
        // valueFormat: { type: 'fixedPoint', precision: 1 }
      }
    ],
    totalItems: [
      {
        column: 'resultPrice',
        summaryType: 'sum',
        displayFormat: '총합total',
        // valueFormat: { type: 'fixedPoint', precision: 1 }
      }
    ]
  }
  //모달열기
  const openModal = (e: any) => {
    setShowModal(true);
    setClickRow(e.data);
  };

  // 모달닫기
  const closeModal = async () => {
    setShowModal(false);
    setInsertShowModal(false);
    const result = await axios.get<dataResponse>(orderApi, {});
    setRow(result.data);
  };

  const openInsertModal = (e: any) => {
    setInsertShowModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get<dataResponse>(orderApi, {
        params: {orderDateFrom: orderDateFrom, orderDateTo : orderDateTo}
      });

      setRow(result.data);
      const col: Array<ColumnType> = orderTableColumn;
      setColumn(col);

      // 거래처 정보를 가지고옴
      const companyResult = await axios.get<dataResponse>(companyApi, {
        params: {}
      });
      setCompanyData(companyResult.data);
    };

    fetchData();
  }, []);
  const handleDateFrom = (date: Date | null) => { // 선택된 날짜의 타입을 Date | null로 지정
    setOrderDateFrom(date?.toISOString() || "");
  };
  const handleDateTo = (date: Date | null) => { // 선택된 날짜의 타입을 Date | null로 지정
    setOrderDateTo(date?.toISOString() || "");
  };

  const selectDate = async () =>{
    const result = await axios.get<dataResponse>(orderApi, {
      params: {orderDateFrom: orderDateFrom, orderDateTo : orderDateTo}
    });
    setRow(result.data);
  }

  return (
    <Container>

      <Row xs={2} md={4} lg={6}>
        <Col>
          <button onClick={openInsertModal}>주문 입력</button>
        </Col>
        <Col>
          <div>시작일</div>
          <DatePickerComponent  onDateChange={handleDateFrom} dateParams={new Date(orderDateFrom)}/>
        </Col>
        <Col>
          <div>종료일</div>
          <DatePickerComponent  onDateChange={handleDateTo} dateParams={new Date(orderDateTo)}/>
        </Col>
        <Col>
          <Button onClick={selectDate}>검색</Button>
        </Col>
      </Row>

      <DataGrid
        dataSource={row}
        columns={column}
        summary={summary}
        allowColumnResizing={true}
        allowColumnReordering={true}
        hoverStateEnabled={true}
        showBorders={true}
        showColumnHeaders={true}
        showRowLines={true}
        onRowClick={openModal}
      >
        <Grouping texts={{
          groupContinuedMessage: "이전 페이지부터 이어짐",
          groupContinuesMessage: "다음 페이지에 이어짐"
        }}></Grouping>
        <GroupPanel
          allowColumnDragging={true}
          visible={true}
          emptyPanelText={"여기에 그룹을 넣어주세요"}
        ></GroupPanel>
        <Editing></Editing>
        <Export enabled={true} fileName={"주문관리"}></Export>
        <ColumnChooser enabled={true} mode={"select"}></ColumnChooser>
        <SearchPanel width={"250"} placeholder={"검색"} visible={true} />
       <Summary groupItems={summary.groupItems} totalItems={summary.totalItems}/>
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

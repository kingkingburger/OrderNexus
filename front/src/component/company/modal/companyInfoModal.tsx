import ReactModal from "react-modal";
import { Company, companyApi, Order } from "../companyTable";
import { ColumnChooser, DataGrid, Editing, Grouping, GroupPanel } from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { orderTableInfoColumn } from "../../order/column/orderTableInfoColumn";
import { ColumnType } from "../../order/orderTable";
import CompanyUpdateModal from "./companyUpdateModal";
import CompanyDeleteModal from "./companyDeleteModal";
import { Export } from "devextreme-react/chart";
import { Button, Col, Row } from "react-bootstrap";
import { getMonthStartEndDateTime } from "../../util/lib/dateRelated";
import DatePickerComponent from "../../util/datePick";
import axios from "axios";

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
                            data // table에서 넘어온 row의 정보
                          }: MyModalProps) => {
  const [column, setColumn] = useState<Array<ColumnType>>([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clickRow, setClickRow] = useState({} as Company);
  const [total, setTotal] = useState(0);
  const [duplicateInfo, setDuplicateInfo] = useState<Order[]>([]);
  // 기간설정 state
  const { monthStart, monthEnd } = getMonthStartEndDateTime();
  const [orderDateFrom, setOrderDateFrom] = useState(monthStart || "");
  const [orderDateTo, setOrderDateTo] = useState(monthEnd || "");

  // props의 값을 state로 옮기기 위한 과정
  useEffect(() => {
    if (data.orders) {
      const getInfoFromId = async () => {
        const result = await axios.get<Company>(`${companyApi}/${data.id}`, {
          params: { DateFrom: monthStart, DateTo: monthEnd }
        });
        // duplicate라는 state로 info data 이동
        setDuplicateInfo(result.data.orders as Order[]);
      };
      getInfoFromId();
    }
  }, [data.id]);

  // infoData 넘어온거 깊은복사 과정
  const jsonStr2 = JSON.stringify(data, null, 2);
  const infoData = JSON.parse(jsonStr2) as Company;

  // update 모달열기
  const openUpdateModal = (e: any) => {
    // 클릭된 데이터 담아두기
    setClickRow(infoData);
    setShowUpdateModal(true);
  };

  // delete 모달열기
  const openDeleteModal = (e: any) => {
    // 클릭된 데이터 담아두기
    setClickRow(infoData);
    setShowDeleteModal(true);
  };

  // 전체 모달 닫기
  const closeModal = () => {
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    // 모달이 닫히면 기간 1달로 초기화
    setOrderDateFrom(monthStart);
    setOrderDateTo(monthEnd);
    setClickRow({} as Company);
  };

  // update,delete되었는지 확인하기 위함
  const handleUpdateChange = (newValue: boolean) => {
    // update,delete가 되었다면 모달 닫기
    if (newValue) {
      onClose();
    }
  };

  // col 설정
  useEffect(() => {
    const col: Array<ColumnType> = orderTableInfoColumn;
    setColumn(col);
  }, []);

  // 총합을 구하기 위함
  useEffect(() => {
    if (infoData.orders) {
      const sum = duplicateInfo?.reduce((acc, cur) => {
        return acc + Number(cur.resultPrice);
      }, 0);
      setTotal(sum);
    }
  }, [duplicateInfo]);

  const handleDateFrom = (date: Date | null) => { // 선택된 날짜의 타입을 Date | null로 지정
    setOrderDateFrom(date?.toISOString() || "");
  };
  const handleDateTo = (date: Date | null) => { // 선택된 날짜의 타입을 Date | null로 지정
    setOrderDateTo(date?.toISOString() || "");
  };

  // 필터링된 row만 보여주기 위함
  const selectDate = () => {
    if(duplicateInfo){
      const getInfoFromId = async () => {
        const result = await axios.get<Company>(`${companyApi}/${data.id}`, {
          params: { DateFrom: orderDateFrom, DateTo: orderDateTo }
        });
        // duplicate라는 state로 info data 이동
        setDuplicateInfo(result.data.orders as Order[]);
      };
      getInfoFromId();
    }
  };

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

      <button onClick={openUpdateModal}>수정</button>
      <button onClick={openDeleteModal}>삭제</button>

      <Row xs={2} md={4} lg={6}>
        <Col>
          <div>시작일</div>
          <DatePickerComponent onDateChange={handleDateFrom} dateParams={new Date(orderDateFrom)} />
        </Col>
        <Col>
          <div>종료일</div>
          <DatePickerComponent onDateChange={handleDateTo} dateParams={new Date(orderDateTo)} />
        </Col>
        <Col>
          <Button onClick={selectDate}>검색</Button>
        </Col>
      </Row>

      {/*dataSource={infoData.orders}*/}
      {/*dataSource={duplicateInfo}*/}

      <DataGrid
        dataSource={duplicateInfo}
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
        <Export enabled={true} fileName={`${infoData.name}`}></Export>
        <ColumnChooser enabled={true} mode={"select"}></ColumnChooser>
      </DataGrid>

      <Button variant="warning" size="lg" disabled>총합 : {total}</Button>

      {/*<div className={styles.totalCount}> 총합 : {total}</div>*/}
      <button onClick={onSubmit}>확인</button>
      <button onClick={onClose}>취소</button>

      <CompanyUpdateModal
        isOpen={showUpdateModal}
        onClose={closeModal}
        onSubmit={() => console.log("Submit")}
        title="거래처 주문 상세정보"
        data={clickRow}
        handleUpdateChange={handleUpdateChange}
      />

      <CompanyDeleteModal
        isOpen={showDeleteModal}
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

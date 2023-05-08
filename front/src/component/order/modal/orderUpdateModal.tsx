import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import InputField from "../../util/inputField";
import { Company, Order } from "../orderTable";
import Select, { ActionMeta, SingleValue } from "react-select";
import DatePickerComponent from "../../util/datePick";
import { companyApi } from "../../company/companyTable";

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  data: Order;
  handleUpdateChange: (newValue: boolean) => void;
}

interface updateParamType {
  name: string;
  address: string;
  phone: string;
  ccIdCompanyType: number;
}
interface OptionType {
  value: number;
  label: string;
}
const OrderUpdateModal = ({
                              isOpen,
                              onClose,
                              onSubmit,
                              title,
                              data,
                              handleUpdateChange
                            }: MyModalProps) => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [resultPrice, setResultPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // 선택된 날짜의 타입을 Date | null로 지정
  const [companyData,setCompanyData] = useState<Array<Company>>([]); // company 정보를 들어오기 위함
  // 외래키
  const [company, setCompany] = useState(0);

  console.log('data = ' , data);
  const handleDateChange = (date: Date | null) => { // 선택된 날짜의 타입을 Date | null로 지정
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      // 거래처 정보를 가지고옴
      const companyResult = await axios.get<Array<Company>>(companyApi, {
        params: {}
      });
      setCompanyData(companyResult.data);
    };
    fetchData();
    // [componentWillUnmount] 모달창이 종료되었을 때 isOpen을 false로 만들기 위함
    return () => {
      onClose();
    };
  }, []);
  // resultPrice 계산하기 => 가격 * 개수
  useEffect(() => {
    setResultPrice(price * count);
  },[price, count]);

  // data가 들어오면 infoData로 채워주기 위함
  useEffect(() =>{
    setItemName( data.itemName || "");
    setPrice(data.price || 0);
    setCount( data.count ||0);
    setResultPrice(data.resultPrice||0);
    setDescription(data.description||"");
    setOrderDate(data.orderDate || "");
    setSelectedDate(new Date());
  },[data])

  // 수정이 끝나고 데이터를 초기화 하기 위함
  const resetStates = () => {
    setItemName("");
    setPrice(0);
    setCount(0);
    setResultPrice(0);
    setDescription("");
    setOrderDate("");
    setSelectedDate(new Date());
  };
  
  // 거래처 여러개 보여주기 위함
  const multiSelectChange = (
    newValue: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    if (newValue === null) {
      setCompany(0);
    } else {
      setCompany(newValue.value);
    }
  };

  const updateAction = async () => {
    const updatedId = data.id;
    const updateParam = {
      code: new Date(),
      itemName: itemName,
      price: price,
      count: count,
      resultPrice: resultPrice,
      description: description,
      orderDate: selectedDate || new Date(orderDate),
      company: company
    };

    await axios.put<updateParamType>(
      `http://localhost:3586/order/${updatedId}`,
      updateParam
    );
    // 부모 컴포넌트에게 update되었다고 알리기 위함
    handleUpdateChange(true);

    // 다음에 상태창을 열 때 값이 초기화 되도록
    resetStates();

    // 업데이트 되면 창 닫기
    onClose();
  };

  const options: OptionType[] = companyData.map(({ id, name }) => ({
    value: id,
    label: name
  }));
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>주문 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" as={Row}>
            <Form.Label column md={3}>
              거래처명
            </Form.Label>
            <Col md={9}>
              <Select
                closeMenuOnSelect={true}
                onChange={multiSelectChange}
                options={options}
              />
            </Col>
          </Form.Group>


          <InputField
            controlId="formItemName"
            label="품목 명:"
            value={itemName}
            placeholder="품목 명"
            onChange={(e) => setItemName(e.target.value)}
          />

          <InputField
            controlId="formPrice"
            label="가격:"
            value={price}
            placeholder="품목 가격"
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <InputField
            controlId="formCount"
            label="개수:"
            value={count}
            placeholder="품목 개수"
            onChange={(e) => setCount(Number(e.target.value))}
          />

          <InputField
            controlId="formResultPrice"
            label="합계금액:"
            value={resultPrice}
            placeholder="합계금액"
            onChange={(e) => setResultPrice(Number(e.target.value))}
          />

          <InputField
            controlId="formDescription"
            label="비고:"
            value={description}
            placeholder="비고"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Form.Group className="mb-3" as={Row}>
            <Form.Label column md={3}>
              주문일자
            </Form.Label>
            <Col md={9}>
              <DatePickerComponent onDateChange={handleDateChange}/>
            </Col>
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={updateAction}>
          수정
        </Button>
        <Button variant="secondary" onClick={onClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderUpdateModal;

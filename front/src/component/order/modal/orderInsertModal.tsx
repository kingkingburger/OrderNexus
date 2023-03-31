import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import InputField from "../../util/inputField";
import { Company } from "../../company/companyTable";
import Select, { ActionMeta, SingleValue } from "react-select";

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  data: Array<Company>;
}

interface insertParamType {
  name: string;
  address: string;
  phone: string;
  ccIdCompanyType: number;
}
interface OptionType {
  value: number;
  label: string;
}
const OrderInsertModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  data, // 거래처(company)의 정보
}: MyModalProps) => {
  const [name, setName] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [description, setDescription] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [company, setCompany] = useState(0);
  useEffect(() => {}, []);

  const resetState = () => {
    setName("");
    setItemName("");
    setPrice(0);
    setCount(0);
    setDescription("");
    setOrderDate("");
    setCompany(0);
  };

  const insertAction = async () => {
    const insertParam = {
      code: new Date(),
      name: name,
      itemName: itemName,
      price: price,
      count: count,
      description: description,
      orderDate: new Date(orderDate),
      company: company,
    };

    const result = await axios.post<insertParamType>(
      "http://localhost:3586/order",
      insertParam
    );
    onClose();
    resetState();
  };

  // const multiSelectChange = (clickedCompany: OptionType) => {
  //   setCompany(clickedCompany.value);
  // };

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

  const options: OptionType[] = data.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>주문 입력</Modal.Title>
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
          {/*<InputField*/}
          {/*  controlId="formName"*/}
          {/*  label="주문 명:"*/}
          {/*  value={name}*/}
          {/*  placeholder="주문 명"*/}
          {/*  onChange={(e) => setName(e.target.value)}*/}
          {/*/>*/}
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
            controlId="formDescription"
            label="비고:"
            value={description}
            placeholder="비고"
            onChange={(e) => setDescription(e.target.value)}
          />
          <InputField
            controlId="formOrderDate"
            label="주문 일자:"
            value={orderDate}
            placeholder="주문 일자"
            onChange={(e) => setOrderDate(e.target.value)}
          />
          {/*<InputField*/}
          {/*  controlId="formCompany"*/}
          {/*  label="회사명:"*/}
          {/*  type="number"*/}
          {/*  value={company}*/}
          {/*  placeholder="회사명"*/}
          {/*  onChange={(e) => setCompany(+e.target.value)}*/}
          {/*/>*/}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={insertAction}>
          등록
        </Button>
        <Button variant="secondary" onClick={onClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderInsertModal;

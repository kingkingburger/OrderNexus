import { companyApi, header, Order } from "../companyTable";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import InputField from "../../util/inputField";

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  data: Order;
}
interface insertParamType {
  name: string;
  address: string;
  phone: string;
  ccIdCompanyType: number;
}

const CompanyInsertModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  data,
}: MyModalProps) => {
  const [name, setName] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fax, setFax] = useState("");

  useEffect(() => {}, []);

  const insertAction = async () => {
    const insertParam = {
      name: name,
      code: new Date(),
      ccIdCompanyType: 31,
      group: "코드공장",
      registrationNumber: "",
      corporationNumber: "",
      ceoName: "거래처",
      phone: phone,
      fax: "0123-12314-12314",
      email: "",
      homepage: "",
      zipCode: "",
      address1: "",
      address2: "",
      tags: ["원자재"],
      description: "",
      companyGroupIds: [],
    };

    console.log("companyApi = ", companyApi);
    console.log("insertParam = ", insertParam);
    console.log("header = ", header);
    const result = await axios.post<insertParamType>(
      "http://localhost:3030/companies",
      insertParam,
      {
        headers: header,
      }
    );
    console.log("result = ", result);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>거래처 입력</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <InputField
            controlId="formName"
            label="거래처 명:"
            value={name}
            placeholder="거래처 명"
            onChange={(e) => setName(e.target.value)}
          />

          <InputField
            controlId="formCeoName"
            label="거래처 대표자 이름:"
            value={ceoName}
            placeholder="거래처 대표자 이름"
            onChange={(e) => setCeoName(e.target.value)}
          />

          <InputField
            controlId="formEmail"
            label="이메일:"
            value={email}
            placeholder="이메일 주소"
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            controlId="formAddress"
            label="주소:"
            value={address}
            placeholder="거래처 주소"
            onChange={(e) => setAddress(e.target.value)}
          />

          <InputField
            controlId="formAddressNumber"
            label="우편번호:"
            value={addressNumber}
            placeholder="거래처 우편번호"
            onChange={(e) => setAddressNumber(e.target.value)}
          />

          <InputField
            controlId="formPhone"
            label="전화번호:"
            value={phone}
            placeholder="전화번호"
            onChange={(e) => setPhone(e.target.value)}
          />

          <InputField
            controlId="formFax"
            label="팩스 번호:"
            value={fax}
            placeholder="팩스 주소"
            onChange={(e) => setFax(e.target.value)}
          />
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

export default CompanyInsertModal;

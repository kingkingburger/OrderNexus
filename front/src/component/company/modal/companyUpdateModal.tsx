import { Company, Order } from "../companyTable";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import InputField from "../../util/inputField";

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  data: Company;
  handleUpdateChange: (newValue: boolean) => void;
}

interface updateParamType {
  name: string;
  phone: string;
  ceoName: string;
  address: string;
  email: string;
  fax: string;
}

const CompanyUpdateModal = ({
                              isOpen,
                              onClose,
                              onSubmit,
                              title,
                              data,
                              handleUpdateChange
                            }: MyModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fax, setFax] = useState("");

  useEffect(() => {
    // [componentWillUnmount] 모달창이 종료되었을 때 isOpen을 false로 만들기 위함
    return () => {
      onClose();
    };
  }, []);

  useEffect(() => {
    setName(data.name || "");
    setCeoName(data.ceoName || "");
    setAddress(data.address || "");
    setAddressNumber(data.addressNumber || "");
    setPhone(data.phone || "");
    setEmail(data.email || "");
    setFax(data.fax || "");
  }, [data]);



  const resetStates = () => {
    setName("");
    setCeoName("");
    setAddress("");
    setAddressNumber("");
    setPhone("");
    setEmail("");
    setFax("");
  };

  const updateAction = async () => {
    const updatedId = data.id;
    const updateParam = {
      name: name,
      ceoName: ceoName,
      email: email,
      address: address,
      addressNumber: addressNumber,
      phone: phone,
      fax: fax
    };

    await axios.put<updateParamType>(
      `${process.env.API_ADDRESS}/company/${updatedId}`,
      updateParam
    );
    // 부모 컴포넌트에게 update되었다고 알리기 위함
    handleUpdateChange(true);

    // 다음에 상태창을 열 때 값이 초기화 되도록 
    resetStates();

    // 업데이트 되면 창 닫기
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>거래처 수정</Modal.Title>
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

export default CompanyUpdateModal;

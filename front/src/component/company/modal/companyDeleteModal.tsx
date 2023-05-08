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

const CompanyDeleteModal = ({
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

  const deleteAction = async () => {
    const deletedId = data.id;
    await axios.delete<updateParamType>(
      `http://localhost:3586/company/${deletedId}`
    );

    // 부모 컴포넌트에게 delete되었다고 알리기 위함
    handleUpdateChange(true);

    // 다음에 상태창을 열 때 값이 초기화 되도록
    resetStates();

    // 업데이트 되면 창 닫기
    onClose();
  };

  return (
    <Modal size="sm" show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>삭제하시겠습니까?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        삭제하시겠습니까?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={deleteAction}>
          삭제
        </Button>
        <Button variant="secondary" onClick={onClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompanyDeleteModal;
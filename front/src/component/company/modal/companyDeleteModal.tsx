import { Company, companyApi } from "../companyTable";
import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  data: Company;
  handleUpdateChange: (newValue: boolean) => void;
}

interface deleteParamType {
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

  useEffect(() => {
    // [componentWillUnmount] 모달창이 종료되었을 때 isOpen을 false로 만들기 위함
    return () => {
      onClose();
    };
  }, []);

  const deleteAction = async () => {
    const deletedId = data.id;
    await axios.delete<deleteParamType>(
      `${companyApi}/${deletedId}`
    );

    // 부모 컴포넌트에게 delete되었다고 알리기 위함
    handleUpdateChange(true);

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

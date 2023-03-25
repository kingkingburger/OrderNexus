import ReactModal from "react-modal";
import { Order } from "../orderTable";

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  data: Order;
}

const OrderInfoModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  data,
}: MyModalProps) => {
  const jsonStr = JSON.stringify(data.Company, null, 2);
  const jsonStr2 = JSON.stringify(data, null, 2);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="주문 상세"
      ariaHideApp={false}
    >
      <h1>{title}</h1>
      <div>{jsonStr}</div>
      <p>모달안에 내용들</p>
      <div>{jsonStr2}</div>
      <button onClick={onSubmit}>확인</button>
      <button onClick={onClose}>취소</button>
    </ReactModal>
  );
};

export default OrderInfoModal;

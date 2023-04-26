import { Order } from "../../order/orderTable";

export const cellCalculate = (row: Order, word: string = "") => {
  const formattedAmount = new Intl.NumberFormat("ko-KR", { currency: "KRW" }).format(Number(row.resultPrice)); // Intl.NumberFormat을 사용하여 국가별 통화 형식에 맞게 포맷팅
  return `${formattedAmount} ${word}`;
};

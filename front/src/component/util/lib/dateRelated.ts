import dayjs from "dayjs";

// 현재시간의 1일부터 마지막일을 가져오기 (5월 1일 ~ 5월 31일)
export const getMonthStartEndDateTime = () =>{
  const now = dayjs();
  const monthStart = now.startOf('month').format('YYYY-MM-DD HH:mm:ss');
  const monthEnd = now.endOf('month').format('YYYY-MM-DD HH:mm:ss');
  return {monthStart, monthEnd}
}
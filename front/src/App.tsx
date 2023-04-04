import React from "react";
import "./App.css";
import OrderTable from "./component/order/orderTable";
import "devextreme/dist/css/dx.light.css";
import Test2 from "./component/test2";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./component/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyTable from "./component/company/companyTable";
export interface dataResponse {
  status: number;
  code: string;
  message: string;
  data: {
    count: number;
    rows: { [key: string]: any };
  };
  remark: string | null;
}
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<OrderTable />} />
        <Route path="/company" element={<CompanyTable  />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

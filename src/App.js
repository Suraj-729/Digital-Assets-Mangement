import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/bootstrap/dist/css/bootstrap.min.css";
import "./css/mvpStyle.css"
import MultiStepForm from "./components/MultiStepForm";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <BrowserRouter >
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/Agency" element={<BillionEye />} /> */}
        <Route path="/mvp" element={<MultiStepForm />} />
        <Route path="/damLogin" element={<LoginPage/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

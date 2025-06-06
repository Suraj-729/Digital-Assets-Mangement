import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/bootstrap/dist/css/bootstrap.min.css";
import "./css/mvpStyle.css"
import MultiStepForm from "./components/MultiStepForm";


function App() {
  return (
    <BrowserRouter >
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/Agency" element={<BillionEye />} /> */}
        <Route path="/mvp" element={<MultiStepForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

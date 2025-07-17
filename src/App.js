import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ChangePasswordPage from "./components/ChangePassword";
import RegisterPage from "./components/Register";
import RouteTracker from "./components/RouteTracker";
// import MultiStepForm from "./components/MultiStepForm";
import "./css/bootstrap/dist/css/bootstrap.min.css";
import "./css/bootstrap-icons/font/bootstrap-icons.css";
import "./css/app.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [prevPath, setPrevPath] = useState(null);

  return (
    <BrowserRouter>
      <RouteTracker setPrevPath={setPrevPath} />

      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/damLogin" />} />

        {/* Login & Register */}
        <Route path="/damLogin" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Dashboard route with both employeeId and employeeType */}
        {/* <Route
          path="/dashboard/:employeeId/:employeeType"
          element={
            <ProtectedRoute>
              <Dashboard prevPath={prevPath} />
            </ProtectedRoute>
          }
        /> */}
     {/* <Route path="/add-project" element={<MultiStepForm />} /> */}
        {/* Change Password */}
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Optional fallback: if directly accessed with only employeeType (not recommended) */}
        {/* <Route
          path="/dashboard/:employeeType"
          element={
            <ProtectedRoute>
              <Dashboard prevPath={prevPath} />
            </ProtectedRoute>
          }
        /> */}

        {/* Optional fallback: direct Dashboard access without auth (not recommended) */}
        {/* <Route path="/damLogin/:employeeType" element={<Dashboard />} /> */}
      </Routes>

      {/* Toast Notification */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
        bodyClassName="toast-body"
      />
    </BrowserRouter>
  );
}

export default App;
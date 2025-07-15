
// import { useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import LoginPage from "./components/LoginPage";
// import Dashboard from "./components/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import ChangePasswordPage from "./components/ChangePassword";
// import RegisterPage from "./components/Register";
// import RouteTracker from "./components/RouteTracker"; // 👈 import

// import "./css/bootstrap/dist/css/bootstrap.min.css";
// import "./css/bootstrap-icons/font/bootstrap-icons.css";
// import "./css/app.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   FaCheckCircle,
//   FaExclamationCircle,
//   FaInfoCircle,
//   FaExclamationTriangle,
// } from "react-icons/fa";

//   const employeeId = localStorage.getItem("employeeId");
// const employeeType = localStorage.getItem("employeeType");
// function App() {
//   const [prevPath, setPrevPath] = useState(null);

//   return (
//     <BrowserRouter>
//       <RouteTracker setPrevPath={setPrevPath} /> {/* 👈 Track route change */}
//       {/* <Routes>
//         <Route path="/" element={<Navigate to="/damLogin" />} />
//         <Route path="/damLogin" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route
//           path={`/dashboard/${employeeType}`}
//           element={
//             <ProtectedRoute>
//               <Dashboard prevPath={prevPath} /> 
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/damLogin/:employeeType"
//           element={<Dashboard  />} 
//         />
//         <Route path="/change-password" element={<ChangePasswordPage />} />
//       </Routes> */}
//       <Routes>
//   <Route path="/" element={<Navigate to="/damLogin" />} />
//   <Route path="/damLogin" element={<LoginPage />} />
//   <Route path="/register" element={<RegisterPage />} />

//   {/* Correct route using both employeeId and employeeType */}
//   <Route
//     path="/dashboard/:employeeId/:employeeType"
//     element={
//       <ProtectedRoute>
//         <Dashboard prevPath={prevPath} />
//       </ProtectedRoute>
//     }
//   />

//   {/* Optional fallback: just by employeeType */}
//   <Route
//     path="/dashboard/:employeeType"
//     element={
//       <ProtectedRoute>
//         <Dashboard prevPath={prevPath} />
//       </ProtectedRoute>
//     }
//   />

//   {/* When accessed directly via damLogin/:employeeType (no auth guard) */}
//   <Route path="/damLogin/:employeeType" element={<Dashboard />} />

//   <Route path="/change-password" element={<ChangePasswordPage />} />
// </Routes>

//       {/* <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored" // or "light", "dark"
//       /> */}
// <ToastContainer
//   position="top-right"
//   autoClose={4000}
//   hideProgressBar={false}
//   newestOnTop={true}
//   closeOnClick
//   pauseOnFocusLoss={false}
//   draggable
//   pauseOnHover
//   theme="colored"
//   bodyClassName="toast-body"
// />
//     </BrowserRouter>
//   );
// }

// export default App;
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
        <Route
          path="`/dashboard/by-type/${employeeId}?employeeType=${employeeType}`"
          element={
            <ProtectedRoute>
              {/* <Dashboard prevPath={prevPath} />  */}
            </ProtectedRoute>
          }
        />

        {/* Change Password */}
        <Route path="/change-password" element={<ChangePasswordPage />} />

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

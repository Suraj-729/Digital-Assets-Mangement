
// import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
// import Dashboard from "./components/Dashboard";

// import ProtectedRoute from "./components/ProtectedRoute";
// import ChangePasswordPage from "./components/ChangePassword";

// // import ProtectedRoute from "./components/ProtectedRoute";

// import RegisterPage from "./components/Register";
// import "./css/bootstrap/dist/css/bootstrap.min.css";
// import "./css/bootstrap-icons/font/bootstrap-icons.css"

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/damLogin" />} />
//         <Route path="/damLogin" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route
//           path="/dashboard"
//           element={
//              <ProtectedRoute>
//               <Dashboard />
//              </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/damLogin/:employeeType"
//           element={
//             // <ProtectedRoute>
//               <Dashboard />
//             // </ProtectedRoute>
//           }
//         />
//          <Route path="/change-password" element={<ChangePasswordPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
// export default App;
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ChangePasswordPage from "./components/ChangePassword";
import RegisterPage from "./components/Register";
import RouteTracker from "./components/RouteTracker"; // 👈 import

import "./css/bootstrap/dist/css/bootstrap.min.css";
import "./css/bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [prevPath, setPrevPath] = useState(null);

  return (
    <BrowserRouter>
      <RouteTracker setPrevPath={setPrevPath} /> {/* 👈 Track route change */}
      <Routes>
        <Route path="/" element={<Navigate to="/damLogin" />} />
        <Route path="/damLogin" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard prevPath={prevPath} /> 
            </ProtectedRoute>
          }
        />
        <Route
          path="/damLogin/:employeeType"
          element={<Dashboard  />} 
        />
        <Route path="/change-password" element={<ChangePasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

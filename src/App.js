// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
// import Dashboard from "./components/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import RegisterPage from "./components/Register";
// import "./css/bootstrap/dist/css/bootstrap.min.css";
// import "./css/bootstrap-icons/font/bootstrap-icons.css"

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/damLogin" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }
// export default App;

import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import ChangePasswordPage from "./components/ChangePassword";

// import ProtectedRoute from "./components/ProtectedRoute";

import RegisterPage from "./components/Register";
import "./css/bootstrap/dist/css/bootstrap.min.css";
import "./css/bootstrap-icons/font/bootstrap-icons.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/damLogin" />} />
        <Route path="/damLogin" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
              <Dashboard />
            // {/* </ProtectedRoute> */}
          }
        />
        <Route
          path="/damLogin/:employeeType"
          element={
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          }
        />
         <Route path="/change-password" element={<ChangePasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
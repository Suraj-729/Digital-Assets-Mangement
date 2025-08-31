
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ChangePasswordPage from "./components/ChangePassword";
import RegisterPage from "./components/Register";
import RouteTracker from "./components/RouteTracker";
import MultiStepFormWrapper from "./components/MultiStepFormWrapper";
import ProjectDetailsView from "./components/ProjectDetailsView/ProjectTab";
// import ProjectDetailsView from "./components/ProjectDetailsView/InfraStructure";
import HomePage from "./components/HomePage";
import "./css/bootstrap/dist/css/bootstrap.min.css";
import "./css/bootstrap-icons/font/bootstrap-icons.css";
import "./css/app.css";
import StepHodPage from "./components/StepHodpage";

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

        {/* Public Routes */}
        <Route path="/damLogin" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/dashboard/addProjectByHOD" element={<StepHodPage />} />
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/addProject"
          element={
            <ProtectedRoute>
              <MultiStepFormWrapper />
            </ProtectedRoute>
          }
        />
<Route
  path="/dashboard/viewProject/:projectName"
  element={
    <ProtectedRoute>
      <ProjectDetailsView />
    </ProtectedRoute>
  }
/>
        <Route
          path="/dashboard/EDITProject/:projectName"
          element={
            <ProtectedRoute>
              <MultiStepFormWrapper />
            </ProtectedRoute>
          }
        />
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

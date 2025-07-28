// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
//   return isAuthenticated ? children : <Navigate to="/damLogin" />;
// };

// export default ProtectedRoute;
// ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  // const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const isAuthenticated = sessionStorage.getItem("userId") !== null;

  // If not authenticated, redirect to login with state
  if (!isAuthenticated) {
    return <Navigate to="/damLogin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;



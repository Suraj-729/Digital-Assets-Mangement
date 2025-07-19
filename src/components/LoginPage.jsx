
import React, { useState } from "react";
import api from "../Api";
import "../css/loginpage.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
const LoginPage = ({ onLogin }) => {
  const location = useLocation();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!loginId.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await api.post(
        "/users/login",
        { loginId, password },
        { withCredentials: true }
      );

      const user = response.data.user;
      const employeeId = location.state?.employeeId || localStorage.getItem("employeeId");
      const employeeType = location.state?.employeeType || localStorage.getItem("employeeType");
      
      // Save session data
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userId", user.userId);
      localStorage.setItem("employeeId", user.employeeId);
      localStorage.setItem("employeeType", user.employeeType);

      // Set HOD value if present
      const hodValue = user.HOD && user.HOD !== "HOD" ? user.HOD : "";
      localStorage.setItem("HOD", hodValue);

      if (onLogin) onLogin(user);

      toast.success("Login successful");

      // ✅ Navigate to the protected route with both params
      // navigate(`/dashboard/${user.employeeId}/${user.employeeType}`);
      navigate("/dashboard", {
        state: {
          // fetchedProjects: response.data,
          employeeId,
          employeeType,
        },
      });
      
    } catch (err) {
      console.error("Login error:", err);
      const message =
        err.response?.data?.error || "Login failed. Please try again.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="form-container login-page">
      {/* Logo */}
      <img
        src="/images/logo.png"
        alt="AssetsIQ Logo"
        style={{
          width: "400px",
          marginBottom: "80px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      {/* Login Form */}
      <div className="login-form">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Employee Id"
            className="form-control"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="forgot-password">
            <button
              type="button"
              className="link-btn"
              onClick={() => navigate("/change-password")}
              style={{
                background: "none",
                border: "none",
                color: "#007bff",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Change Password?
            </button>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginTop: "35px",
          fontSize: "25px",
          color: "#000",
        }}
      >
        <img
          src="/images/niclogo.png"
          alt="NIC Logo"
          style={{ height: "45px" }}
        />
        <span>© 2025 All Rights Reserved.</span>
      </footer>
    </div>
  );
};

export default LoginPage;

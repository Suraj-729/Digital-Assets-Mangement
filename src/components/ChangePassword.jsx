import React, { useState } from "react";
import api from "../Api";
import "../css/loginpage.css";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({ onLogin }) => {
  const [loginId, setLoginId] = useState(""); // Changed from userId
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Login attempt with:", { loginId, password });

    try {
      const response = await api.post(
        "/users/login",
        { loginId, password }, // Changed to loginId
        { withCredentials: true }
      );
      console.log("Login response:", response.data);

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userId", response.data.user.userId);
      localStorage.setItem("employeeId", response.data.user.employeeId);
      localStorage.setItem("employeeType", response.data.user.employeeType);
      if (onLogin) onLogin(response.data.user);

      navigate(`/damLogin/${response.data.user.employeeType}`);
    } catch (err) {
      console.error("Login error details:", {
        message: err.message,
        response: err.response?.data,
        stack: err.stack
      });
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="form-container login-page">
      <div className="login-form">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User ID or Employee ID"
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
          {error && <div className="error-message">{error}</div>}
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
                padding: 0
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
    </div>
  );
};

export default ChangePassword;

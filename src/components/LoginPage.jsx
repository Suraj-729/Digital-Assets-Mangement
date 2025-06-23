
// export default LoginPage;
import React, { useState } from "react";
import api from "../Api";
import "../css/loginpage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Login attempt with:", { userId, password });

    try {
      const response = await api.post(
        "/users/login",
        { userId, password },
        { withCredentials: true }
      );
      console.log("Login response:", response.data);

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userId", userId);
      if (onLogin) onLogin({ userId });
      navigate("/dashboard");
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
            placeholder="User ID"
            className="form-control"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="error-message">{error}</div>}
          <div className="forgot-password">
            <p>Forgot Password?</p>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
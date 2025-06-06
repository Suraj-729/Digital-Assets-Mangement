import React, { useState } from "react";
import api from "../Api";
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Adjust the payload keys to match your backend: assetsId and password
      const response = await api.get("users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // if using cookies/sessions
        body: JSON.stringify({ assetsId: username, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Login failed");
        return;
      }
      if (onLogin) onLogin({ username, password });
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="form-container login-page">
      <div className="login-form">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
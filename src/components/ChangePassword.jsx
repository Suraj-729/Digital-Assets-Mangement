
import React, { useState } from "react";
import api from "../Api";
import "../css/loginpage.css";
import { useNavigate } from "react-router-dom";
import "../css/mvpStyle.css";

const ChangePasswordPage = () => {
  const [loginId, setLoginId] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePasswordMsg, setChangePasswordMsg] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setChangePasswordMsg("");
    try {
      const response = await api.put("/users/change-password", {
        loginId,
        currentPassword,
        newPassword
      });
      setChangePasswordMsg(response.data.message || "Password changed successfully.");
      setLoginId("");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setChangePasswordMsg(
        err.response?.data?.error || "Failed to change password."
      );
    }
  };

  return (
    <div className="form-container login-page">
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
      <div className="login-form">
        <h2 className="text-center">Change Password</h2>
        <form className="change-password-form" onSubmit={handleChangePassword}>
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
            placeholder="Current Password"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn" style={{ marginTop: 10 }}>
            Update Password
          </button>
          {changePasswordMsg && (
            <div className="error-message" style={{ marginTop: 10 }}>
              {changePasswordMsg}
            </div>
          )}
        </form>
        <div style={{ marginTop: 15 }}>
          <button
            className="link-btn"
            onClick={() => navigate("/damLogin")}
            style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", padding: 0 }}
          >
            Back to Login
          </button>
        </div>
      </div>
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
          alt="Footer Logo"
          style={{ height: "45px" }}
        />
        <span>© 2025 All Rights Reserved.</span>
      </footer>
    </div>
  );
};

export default ChangePasswordPage;





// import React, { useState } from "react";
// import api from "../Api";
// import "../css/loginpage.css";
// import { useNavigate } from "react-router-dom";
// import "../css/mvpStyle.css";

// const ChangePasswordPage = () => {
//   const [loginId, setLoginId] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [changePasswordMsg, setChangePasswordMsg] = useState("");
//   const navigate = useNavigate();

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
//     setChangePasswordMsg("");
//     try {
//       const response = await api.put("/users/change-password", {
//         loginId,
//         currentPassword,
//         newPassword
//       });
//       setChangePasswordMsg(response.data.message || "Password changed successfully.");
//       setLoginId("");
//       setCurrentPassword("");
//       setNewPassword("");
//     } catch (err) {
//       setChangePasswordMsg(
//         err.response?.data?.error || "Failed to change password."
//       );
//     }
//   };

//   return (
//     <div className="form-container login-page">
//     <img
//         src="/images/logo.png"
//         alt="AssetsIQ Logo"
//         style={{
//           width: "400px",
//           marginBottom: "80px",
//           display: "block",
//           marginLeft: "auto",
//           marginRight: "auto",
//         }}
//       />
//       <div className="login-form">
//         <h2 className="text-center">Change Password</h2>
//         <form className="change-password-form" onSubmit={handleChangePassword}>
//           <input
//             type="text"
//             placeholder="User ID or Employee ID"
//             className="form-control"
//             value={loginId}
//             onChange={(e) => setLoginId(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Current Password"
//             className="form-control"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="New Password"
//             className="form-control"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//           <button type="submit" className="login-btn" style={{ marginTop: 10 }}>
//             Update Password
//           </button>
//           {changePasswordMsg && (
//             <div className="error-message" style={{ marginTop: 10 }}>
//               {changePasswordMsg}
//             </div>
//           )}
//         </form>
//         <div style={{ marginTop: 15 }}>
//           <button
//             className="link-btn"
//             onClick={() => navigate("/damLogin")}
//             style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", padding: 0 }}
//           >
//             Back to Login
//           </button>
//         </div>
//       </div>
//       <footer
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: "8px",
//           marginTop: "35px",
//           fontSize: "25px",
//           color: "#000",
//         }}
//       >
//         <img
//           src="/images/niclogo.png"
//           alt="Footer Logo"
//           style={{ height: "45px" }}
//         />
//         <span>© 2025 All Rights Reserved.</span>
//       </footer>
//     </div>
//   );
// };

// export default ChangePasswordPage;



import React, { useState } from "react";
import api from "../Api";
import "../css/loginpage.css";
import "../css/mvpStyle.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

// Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePasswordPage = () => {
  const [loginId, setLoginId] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(""); // for server errors
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (!loginId.trim()) formErrors.loginId = "User ID is required.";
    if (!currentPassword)
      formErrors.currentPassword = "Current password is required.";
    if (!newPassword) formErrors.newPassword = "New password is required.";
    else if (newPassword.length < 6)
      formErrors.newPassword = "Password must be at least 6 characters.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setApiError(""); // clear any old errors
      const response = await api.put("/users/change-password", {
        loginId,
        currentPassword,
        newPassword,
      });

      toast.success(response.data.message || "Password changed successfully.", {
        position: "top-center",
        autoClose: 3000,
      });

      // Reset fields after success
      setLoginId("");
      setCurrentPassword("");
      setNewPassword("");
      setErrors({});
    } catch (err) {
      setApiError(err.response?.data?.error || "Invalid credentials.");
    }
  };

  // handle real-time validation error clearing
  const handleInputChange = (field, value) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    if (apiError) setApiError(""); // clear API error on typing
    if (field === "loginId") setLoginId(value);
    if (field === "currentPassword") setCurrentPassword(value);
    if (field === "newPassword") setNewPassword(value);
  };

  return (
    <>
      <Header />
      {/* Centering wrapper */}
      <div
        className="form-container login-page"
        style={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="login-form modern-card">
          <h2 className="text-center">Change Password</h2>

          {/* API Error Alert */}
          {apiError && (
            <div className="alert error-alert">
              <span>{apiError}</span>
              <button
                className="close-btn"
                onClick={() => setApiError("")}
                aria-label="Close"
              >
                ×
              </button>
            </div>
          )}

          <form className="change-password-form" onSubmit={handleChangePassword}>
            {/* Login ID */}
            <div className="form-group">
              <input
                type="text"
                placeholder="User ID or Employee ID"
                className={`form-control ${
                  errors.loginId ? "input-error" : ""
                }`}
                value={loginId}
                onChange={(e) => handleInputChange("loginId", e.target.value)}
              />
              {errors.loginId && (
                <p className="error-message">{errors.loginId}</p>
              )}
            </div>

            {/* Current Password */}
            <div className="form-group">
              <div className="password-wrapper">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Current Password"
                  className={`form-control ${
                    errors.currentPassword ? "input-error" : ""
                  }`}
                  value={currentPassword}
                  onChange={(e) =>
                    handleInputChange("currentPassword", e.target.value)
                  }
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.currentPassword && (
                <p className="error-message">{errors.currentPassword}</p>
              )}
            </div>

            {/* New Password */}
            <div className="form-group">
              <div className="password-wrapper">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  className={`form-control ${
                    errors.newPassword ? "input-error" : ""
                  }`}
                  value={newPassword}
                  onChange={(e) =>
                    handleInputChange("newPassword", e.target.value)
                  }
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.newPassword && (
                <p className="error-message">{errors.newPassword}</p>
              )}
            </div>

            <button type="submit" className="login-btn">
              Update Password
            </button>
          </form>

          <div style={{ marginTop: 15 }}>
            <button
              className="link-btn"
              onClick={() => navigate("/damLogin")}
              style={{
                background: "none",
                border: "none",
                color: "#007bff",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
      <Footer />

      {/* Toast Container */}
      <ToastContainer />

      {/* Extra CSS */}
      <style jsx>{`
        .modern-card {
          background: #fff;
          border-radius: 12px;
          padding: 25px 30px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        .form-group {
          margin-bottom: 15px;
        }
        .password-wrapper {
          position: relative;
        }
        .form-control {
          width: 100%;
          padding-right: 35px;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 10px;
          transition: border 0.3s ease;
        }
        .form-control:focus {
          outline: none;
          border-color: #007bff;
        }
        .input-error {
          border-color: #e74c3c;
        }
        .toggle-password {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #666;
          font-size: 1rem;
        }
        .error-message {
          color: #e74c3c;
          font-size: 0.85rem;
          margin-top: 4px;
        }
        .alert {
          padding: 12px 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          font-size: 0.9rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .error-alert {
          background: #fdecea;
          color: #b71c1c;
          border: 1px solid #f5c6cb;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          color: inherit;
        }
      `}</style>
    </>
  );
};

export default ChangePasswordPage;

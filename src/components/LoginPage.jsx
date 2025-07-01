// import React, { useState } from "react";
// import api from "../Api";
// import "../css/loginpage.css";
// import { useNavigate } from "react-router-dom";

// const LoginPage = ({ onLogin }) => {
//   const [loginId, setLoginId] = useState(""); // Changed from userId
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [changePasswordMsg, setChangePasswordMsg] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     console.log("Login attempt with:", { loginId, password });

//     try {
//       const response = await api.post(
//         "/users/login",
//         { loginId, password }, // Changed to loginId
//         { withCredentials: true }
//       );
//       console.log("Login response:", response.data);

//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("userId", response.data.user.userId);
//       localStorage.setItem("employeeId", response.data.user.employeeId);
//       localStorage.setItem("employeeType", response.data.user.employeeType);
//       if (onLogin) onLogin(response.data.user);
//       // Redirect to /damLogin/employeeType
//       navigate(`/damLogin/${response.data.user.employeeType}`);
//     } catch (err) {
//       console.error("Login error details:", {
//         message: err.message,
//         response: err.response?.data,
//         stack: err.stack
//       });
//       setError(err.response?.data?.error || "Login failed. Please try again.");
//     }
//   };

//   const handleChangePassword = async (e) => {
//   e.preventDefault();
//   setChangePasswordMsg("");
//   try {
//     const response = await api.put("/users/change-password", {
//       loginId,
//       currentPassword,
//       newPassword
//     });
//     setChangePasswordMsg(response.data.message || "Password changed successfully.");
//     setCurrentPassword("");
//     setNewPassword("");
//   } catch (err) {
//     setChangePasswordMsg(
//       err.response?.data?.error || "Failed to change password."
//     );
//   }
// };

//   return (
//     <div className="form-container login-page">
//       <div className="login-form">
//         <h2 className="text-center">Login</h2>
//         <form onSubmit={handleSubmit}>
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
//             placeholder="Password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           {error && <div className="error-message">{error}</div>}
//           <div className="forgot-password">
//             <button
//               type="button"
//               className="link-btn"
//               onClick={() => setShowChangePassword((v) => !v)}
//               style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", padding: 0 }}
//             >
//               Change Password?
//             </button>
//           </div>
//           <button type="submit" className="login-btn">
//             Login
//           </button>
//         </form>

//         {showChangePassword && (
//           <form className="change-password-form" onSubmit={handleChangePassword} style={{ marginTop: 20 }}>
//             <h4>Change Password</h4>
//             <input
//               type="password"
//               placeholder="Current Password"
//               className="form-control"
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="New Password"
//               className="form-control"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//             <button type="submit" className="login-btn" style={{ marginTop: 10 }}>
//               Update Password
//             </button>
//             {changePasswordMsg && (
//               <div className="error-message" style={{ marginTop: 10 }}>
//                 {changePasswordMsg}
//               </div>
//             )}
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";
import api from "../Api";
import "../css/loginpage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
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

export default LoginPage;

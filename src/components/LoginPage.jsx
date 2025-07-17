// import React, { useState } from "react";
// import api from "../Api";
// import "../css/loginpage.css";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";
// const LoginPage = ({ onLogin }) => {
//   const [loginId, setLoginId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     console.log("Login attempt with:", { loginId, password });
//     if (!loginId.trim() || !password.trim()) {
//       toast.error("Please fill in all fields");
//       return;
//     }
//     try {
//       const response = await api.post(
//         "/users/login",
//         { loginId, password },
//         { withCredentials: true }
//       );
//       console.log("Login response:", response.data);

//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("userId", response.data.user.userId);
//       localStorage.setItem("employeeId", response.data.user.employeeId);
//       localStorage.setItem("employeeType", response.data.user.employeeType);

//       // Store the actual HOD name if present, otherwise store an empty string
//       const hodValue =
//         response.data.user.HOD && response.data.user.HOD !== "HOD"
//           ? response.data.user.HOD
//           : "";
//       localStorage.setItem("HOD", hodValue);
//       console.log("HOD set in localStorage:", localStorage.getItem("HOD"));

//       if (onLogin) onLogin(response.data.user);
//       toast.success("Login successful");
//       // toast.success(
//       //   <>
//       //     <FaCheckCircle className="toast-icon" />
//       //     Login successful!
//       //   </>,
//       //    { icon: false }
//       // );

//       navigate(`/damLogin/${response.data.user.employeeType}`);
//     } catch (err) {
//     //   console.error("Login error details:", {
//     //     message: err.message,
//     //     response: err.response?.data,
//     //     stack: err.stack,
//     //   });
//     //   setError(err.response?.data?.error || "Login failed. Please try again.");
//     // }
//     console.error("Login error:", err);
//     const message = err.response?.data?.error || "Login failed. Please try again.";
//     setError(message);
//     toast.error(message);
//   }
//   };

//   return (
//     <div className="form-container login-page">
//       {/* Logo just above the white box */}
//       <img
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

//       {/* Login Form Box */}
//       <div className="login-form">
//         <h2 className="text-center">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Enter Employee Id"
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
//           {/* {error && <div className="error-message">{error}</div>} */}
//           <div className="forgot-password">
//             <button
//               type="button"
//               className="link-btn"
//               onClick={() => navigate("/change-password")}
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#007bff",
//                 cursor: "pointer",
//                 padding: 0,
//               }}
//             >
//               Change Password?
//             </button>
//           </div>
//           <button type="submit" className="login-btn">
//             Login
//           </button>
//         </form>
//       </div>

//       {/* Footer just below the white box */}
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

// export default LoginPage;
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

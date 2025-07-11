

import React, { useState } from "react";
import api from "../Api";
import "../css/mvpStyle.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    employeeId: "",
    employeeType: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!formData.employeeId || !formData.employeeType) {
      setError("Employee ID and Employee Type are required");
      return;
    }

    console.log("Attempting to register user:", formData.userId);

    try {
      const response = await api.post("/users/register", {
        userId: formData.userId,
        password: formData.password,
        employeeId: formData.employeeId,
        employeeType: formData.employeeType
      });
      
      console.log("Registration successful:", response.data);
      setSuccess(true);
      setTimeout(() => navigate("/damLogin"), 2000);
    } catch (err) {
      console.error("Registration error:", {
        message: err.message,
        response: err.response?.data,
        stack: err.stack
      });
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="form-container">
        <div className="success-message">
          <h2>Registration Successful!</h2>
          <p>Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container register-page">
      <div className="register-form">
        <h2 className="text-center">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="userId"
            placeholder="Email Address"
            className="form-control"
            value={formData.userId}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            className="form-control"
            value={formData.employeeId}
            onChange={handleChange}
            required
          />
          <select
            name="employeeType"
            className="form-control"
            value={formData.employeeType}
            onChange={handleChange}
            required
          >
            <option value="">Select Employee Type</option>
            <option value="Admin">Admin</option>
            <option value="HOD">HEAD OF THE DEPARTMENT</option>
            {/* <option value="HOD">Project Manger</option> */}
            {/* Add more types as needed */}
          </select>
          <input
            type="password"
            name="password"
            placeholder="Password (min 8 characters)"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="register-btn">
            Register
          </button>
          <div className="login-link">
            <p>Already have an account? <span onClick={() => navigate("/damLogin")}>Login</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
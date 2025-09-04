import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import Header from "./layouts/HeaderDashboard";
import Sidebar from "./layouts/SidebarDashboard";
import "../css/mvpStyle.css";
import api from "../Api";

const StepHodPage = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    department: "",
    applicationManager: "",
    empCode: "",
  });

  const [managers, setManagers] = useState([]);
  const [errors, setErrors] = useState({});
  const [formToShow, setFormToShow] = useState(null);

  // const departments = ["IT", "HR", "Finance", "Electronics", "Planning" , "Agriculture"];
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get("/getDepartments");
        console.log("API Response:", res.data);

        // res.data is an array with one object containing 'departments'
        if (res.data.length > 0 && res.data[0].departments) {
          setDepartments(res.data[0].departments);
        } else {
          setDepartments([]);
        }
      } catch (error) {
        toast.error("Failed to fetch departments");
        console.error("Fetch error:", error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await api.get(`/allProjectManagers`);
        setManagers(res.data.projectManagers || []);
        console.log(res.data.projectManagers);
      } catch (error) {
        toast.error("Failed to fetch managers");
        console.error("Fetch error:", error);
      }
    };

    fetchManagers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.projectName)) {
      newErrors.projectName = "Only alphabets allowed";
    }

    if (!formData.department) {
      newErrors.department = "Select a department";
    }

    if (!formData.applicationManager) {
      newErrors.applicationManager = "Select a manager";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      const hodName = localStorage.getItem("HOD") || "";
      const res = await api.post("/addprojectbyhod", {
        projectName: formData.projectName,
        deptName: formData.department,
        projectManagerName: formData.applicationManager,
        empCode: formData.empCode,
        employeeId: localStorage.getItem("employeeId"),
        hodName,
      });

      toast.success("Project assigned successfully!");
      setFormData({
        projectName: "",
        department: "",
        applicationManager: "",
        empCode: "",
      });
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Failed to assign project");
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex">
        <Sidebar
          setFormToShow={(form) => setFormToShow(form)}
          isSidebarOpen={true}
        />

        <div
          className="container-fluid p-5"
          style={{
            marginLeft: "260px",
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-5">
                  <h3 className="text-center mb-4 text-primary">
                    HOD Project Information
                  </h3>

                  {/* Project Name */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      📌 Project Name
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      className={`form-control form-control-lg rounded-3 ${
                        errors.projectName ? "is-invalid" : ""
                      }`}
                      value={formData.projectName}
                      onChange={handleChange}
                      placeholder="Enter project name"
                    />
                    {errors.projectName && (
                      <div className="invalid-feedback">
                        {errors.projectName}
                      </div>
                    )}
                  </div>

                  {/* Department Dropdown */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      🏢 Department
                    </label>
                    <select
                      name="department"
                      className={`form-select form-select-lg rounded-3 ${
                        errors.department ? "is-invalid" : ""
                      }`}
                      value={formData.department}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          department: e.target.value,
                        }))
                      } // store deptName
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept.deptName}>
                          {" "}
                          {/* use deptName as value */}
                          {dept.deptName}
                        </option>
                      ))}
                    </select>

                    {errors.department && (
                      <div className="invalid-feedback">
                        {errors.department}
                      </div>
                    )}
                  </div>

                  {/* Manager Dropdown */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      👨‍💼 Project Manager
                    </label>
                    <select
                      name="applicationManager"
                      className={`form-select form-select-lg rounded-3 ${
                        errors.applicationManager ? "is-invalid" : ""
                      }`}
                      value={`${formData.applicationManager} - ${formData.empCode}`}
                      onChange={(e) => {
                        const [name, empCode] = e.target.value.split(" - ");
                        setFormData((prev) => ({
                          ...prev,
                          applicationManager: name.trim(),
                          empCode: empCode.trim(),
                        }));
                      }}
                    >
                      <option value="">Select Manager</option>
                      {managers.map((pm, idx) => (
                        <option key={idx} value={`${pm.PM} - ${pm.employeeId}`}>
                          {pm.PM} - {pm.employeeId}
                        </option>
                      ))}
                    </select>
                    {errors.applicationManager && (
                      <div className="invalid-feedback">
                        {errors.applicationManager}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid">
                    <button
                      className="btn btn-success btn-lg rounded-3"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StepHodPage;

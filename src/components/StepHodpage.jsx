import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
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

  const departments = ["IT", "HR", "Finance", "Electronics", "Planning"];

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
        <Sidebar />
        <div
          className="form-section container-fluid p-4"
          style={{ marginLeft: "260px", minHeight: "100vh" }}
        >
          <h4 className="mb-4">HOD Project Information</h4>

          {/* Project Name */}
          <div className="row mb-3">
            <div className="col-md-6 offset-md-3">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label text-end">
                  Project Name:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="projectName"
                    className={`form-control ${
                      errors.projectName ? "is-invalid" : ""
                    }`}
                    value={formData.projectName}
                    onChange={handleChange}
                  />
                  {errors.projectName && (
                    <div className="invalid-feedback">{errors.projectName}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Department Dropdown */}
          <div className="row mb-3">
            <div className="col-md-6 offset-md-3">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label text-end">
                  Department:
                </label>
                <div className="col-sm-8">
                  <select
                    name="department"
                    className={`form-control ${
                      errors.department ? "is-invalid" : ""
                    }`}
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, idx) => (
                      <option key={idx} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <div className="invalid-feedback">{errors.department}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Manager Dropdown */}
{/* Manager Dropdown */}
<div className="row mb-4">
  <div className="col-md-6 offset-md-3">
    <div className="form-group row">
      <label className="col-sm-4 col-form-label text-end">
        Project Manager:
      </label>
      <div className="col-sm-8">
        <select
          name="applicationManager"
          className={`form-control ${errors.applicationManager ? "is-invalid" : ""}`}
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
          <div className="invalid-feedback">{errors.applicationManager}</div>
        )}
      </div>
    </div>
  </div>
</div>




          {/* Submit Button */}
          <div className="row mb-5">
            <div className="col-md-6 offset-md-3 text-end">
              <button className="btn btn-success" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepHodPage;

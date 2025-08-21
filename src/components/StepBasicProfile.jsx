import React, { useState, useEffect } from "react";
import "../css/mvpStyle.css";
import { toast } from "react-toastify";
import api from "../Api";

const StepBasicProfile = ({ formData = {}, onChange, onNext, employeeType }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  

useEffect(() => {
  if (employeeType === "PM") {
    const empCode = formData.empCode || localStorage.getItem("employeeId");
    if (!empCode) return;

    setLoading(true);
    api.get(`/project-assignments/${empCode}`)
      .then((res) => {
        const data = res.data;

        if (data && data.length > 0) {
          const project = data[0];
          onChange({ target: { name: "projectName", value: project.projectName || "" } });
          onChange({ target: { name: "departmentName", value: project.deptName || "" } });
          onChange({ target: { name: "HOD", value: project.HOD || "" } });
          onChange({ target: { name: "nicOfficerName", value: project.projectManagerName || "" } });
          onChange({ target: { name: "nicOfficerEmpCode", value: project.empCode || "" } });
        } else {
          toast.warning("No project data found for your empCode.");
        }
      })
      .catch((err) => {
        console.error("Error fetching project assignment data:", err);
        toast.error("Failed to fetch project assignment data.");
      })
      .finally(() => setLoading(false));
  }
}, [employeeType]);



 

  useEffect(() => {
  if (employeeType === "PM") {
    const empCode = formData.empCode || localStorage.getItem("employeeId");
    if (!empCode) return;

    setLoading(true);
    api.get(`/project-assignments/by-pm/${empCode}`)
      .then((res) => {
        setProjects(res.data || []);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch project assignment data.");
      })
      .finally(() => setLoading(false));
  }
}, [employeeType, formData.empCode]);

  const handleProjectSelect = (e) => {
    const selectedProject = projects.find((p) => p.projectName === e.target.value);
    if (selectedProject) {
      onChange({ target: { name: "projectName", value: selectedProject.projectName } });
      onChange({ target: { name: "departmentName", value: selectedProject.deptName || "" } });
      onChange({ target: { name: "HOD", value: selectedProject.HOD || "" } });
      onChange({ target: { name: "nicOfficerName", value: selectedProject.projectManagerName || "" } });
      onChange({ target: { name: "nicOfficerEmpCode", value: selectedProject.empCode || "" } });
    } else {
      onChange({ target: { name: "projectName", value: "" } });
    }
  };



  const validate = () => {
    const newErrors = {};
    // const requiredFields = [
    //   "projectName",
    //   "prismId",
    //   "departmentName",
    //   "url",
    //   "publicIp",
    //   "nicOfficerName",
    //   "nicOfficerEmpCode",
    //   "nicOfficerMob",
    //   "nicOfficerEmail",
    //   "deptOfficerName",
    //   "deptOfficerDesignation",
    //   "deptOfficerMob",
    //   "deptOfficerEmail",
    // ];

    // requiredFields.forEach((field) => {
    //   if (!formData[field] || formData[field].trim() === "") {
    //     newErrors[field] = "This field is required";
    //   }
    // });

    // Alphabet-only validation
    const alphaOnlyFields = ["projectName", "departmentName", "HOD"];
    alphaOnlyFields.forEach((field) => {
      const value = formData[field];
      if (value && !/^[A-Za-z\s]+$/.test(value)) {
        newErrors[field] = "Only alphabets are allowed";
      }
    });

    // Mobile number validation
    ["nicOfficerMob", "deptOfficerMob"].forEach((field) => {
      const value = formData[field];
      if (value && !/^\d{10}$/.test(value)) {
        newErrors[field] = "Mobile number must be 10 digits";
      }
    });

    // Email validation
    ["nicOfficerEmail", "deptOfficerEmail"].forEach((field) => {
      const value = formData[field];
      if (
        value &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
      ) {
        newErrors[field] = "Invalid email address";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    // if (validate()) {
    //   onNext();
    // }
    // if (validate()) {
      // toast.success("Basic Profile validated successfully!");
      onNext();
    // } else {
    //   toast.error("Please fill all required fields correctly.");
    // }
  };

  return (
    <fieldset>
      <div className="form-section">
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="row align-items-center">
              <div className="col-sm-4 text-center">
                <label className="form-label">Project Name:</label>
              </div>
              <div className="col-sm-8">
                {employeeType === "PM" ? (
                  <select
                    className={`form-control ${errors.projectName ? "is-invalid" : ""}`}
                    name="projectName"
                    value={formData.projectName || ""}
                    onChange={handleProjectSelect}
                    disabled={loading}
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project.projectName} value={project.projectName}>
                        {project.projectName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className={`form-control ${errors.projectName ? "is-invalid" : ""}`}
                    name="projectName"
                    value={formData.projectName || ""}
                    onChange={onChange}
                  />
                )}
                {errors.projectName && <div className="invalid-feedback">{errors.projectName}</div>}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row align-items-center text-right">
              <div className="col-sm-4 text-center">
                <label className="form-label">PRISM ID:</label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className={`form-control ${errors.prismId ? "is-invalid" : ""}`}
                  name="prismId"
                  value={formData.prismId || ""}
                  onChange={onChange}
                />
                {errors.prismId && <div className="invalid-feedback">{errors.prismId}</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <div className="row align-items-center text-right">
              <div className="col-sm-4 text-center">
                <label className="form-label">Department Name:</label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className={`form-control ${errors.departmentName ? "is-invalid" : ""}`}
                  name="departmentName"
                  value={formData.departmentName || ""}
                  onChange={onChange}
                  disabled={employeeType === "PM"}
                />
                {errors.departmentName && <div className="invalid-feedback">{errors.departmentName}</div>}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row align-items-center text-right">
              <div className="col-sm-4 text-center">
                <label className="form-label">URL:</label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className={`form-control ${errors.url ? "is-invalid" : ""}`}
                  name="url"
                  value={formData.url || ""}
                  onChange={onChange}
                />
                {errors.url && <div className="invalid-feedback">{errors.url}</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="row align-items-center text-right">
              <div className="col-sm-4 text-center">
                <label className="form-label">Public IP:</label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className={`form-control ${errors.publicIp ? "is-invalid" : ""}`}
                  name="publicIp"
                  value={formData.publicIp || ""}
                  onChange={onChange}
                />
                {errors.publicIp && <div className="invalid-feedback">{errors.publicIp}</div>}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row align-items-center text-right">
              <div className="col-sm-4 text-center">
                <label className="form-label">HOD Name:</label>
              </div>
              <div className="col-sm-8">
                <input
                  type="char"
                  className={`form-control ${errors.HOD ? "is-invalid" : ""}`}
                  name="HOD"
                  value={formData.HOD || ""}
                  onChange={onChange}
                  disabled={employeeType === "HOD" || employeeType === "PM"}
                />
                {errors.HOD && <div className="invalid-feedback">{errors.HOD}</div>}
              </div>
            </div>
          </div>
        </div>

        {/* NIC Officer Section */}
        <div className="row">
          <div className="col-md-6">
            <h5 className="sub-heading-1">Nodal Officer from NIC:</h5>
            <div className="p-3 border rounded box-1">
              {["nicOfficerName", "nicOfficerEmpCode", "nicOfficerMob", "nicOfficerEmail"].map(
                (field, i) => {
                  const labels = ["Name:", "Emp Code:", "Mob:", "Email:"];
                  const types = ["text", "text", "text", "email"];
                  // Disable Name and Emp Code when PM
                  const disableField =
                    (field === "nicOfficerName" || field === "nicOfficerEmpCode") && employeeType === "PM";
                  return (
                    <div className="row align-items-center text-right" key={field}>
                      <div className="col-sm-4 mb-2">
                        <label className="form-label">{labels[i]}</label>
                      </div>
                      <div className="col-sm-8 mb-2">
                        <input
                          type={types[i]}
                          className={`form-control ${errors[field] ? "is-invalid" : ""}`}
                          name={field}
                          value={formData[field] || ""}
                          onChange={onChange}
                          disabled={disableField}
                        />
                        {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Department Officer Section */}
          <div className="col-md-6">
            <h5 className="sub-heading-1">Nodal Officer from Department:</h5>
            <div className="p-3 border rounded box-1">
              {["deptOfficerName", "deptOfficerDesignation", "deptOfficerMob", "deptOfficerEmail"].map((field, i) => {
                const labels = ["Name:", "Designation:", "Mob:", "Email:"];
                const types = ["text", "text", "text", "email"];
                return (
                  <div className="row align-items-center text-right" key={field}>
                    <div className="col-sm-4 mb-2">
                      <label className="form-label">{labels[i]}</label>
                    </div>
                    <div className="col-sm-8 mb-2">
                      <input
                        type={types[i]}
                        className={`form-control ${errors[field] ? "is-invalid" : ""}`}
                        name={field}
                        value={formData[field] || ""}
                        onChange={onChange}
                      />
                      {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <input
        type="button"
        name="next"
        className="next action-button btn btn-success"
        value="Next"
        onClick={handleNextClick}
        disabled={loading}
      />
    </fieldset>
  );
};

export default StepBasicProfile;

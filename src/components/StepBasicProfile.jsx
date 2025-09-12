import React, { useState, useEffect } from "react";
import "../css/mvpStyle.css";
import { toast } from "react-toastify";
import api from "../Api";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useNavigate , useParams } from "react-router-dom";


const StepBasicProfile = ({
  formData = {},
  onChange,
  onNext,
  employeeType,
}) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectHods, setProjectHods] = useState([]);

  const [selectedHodId, setSelectedHodId] = useState("");
  const [selectedHodName, setSelectedHodName] = useState("");
  const [noProjects, setNoProjects] = useState(false);
  const navigate = useNavigate();
  const { projectName: projectNameFromUrl } = useParams();

  useEffect(() => {
    if (formData.HOD && projectHods.length > 0) {
      const hod = projectHods.find(
        (h) => h.HOD === formData.HOD || h.employeeId === formData.employeeId
      );
      if (hod) {
        setSelectedHodId(hod.employeeId);
        setSelectedHodName(hod.HOD);
      }
    }
  }, [formData.HOD, formData.employeeId, projectHods]);

  useEffect(() => {
    const fetchHods = async () => {
      try {
        const response = await api.get("/allhods");
        if (response.data && response.data.projectHods) {
          setProjectHods(response.data.projectHods);
        }
      } catch (error) {
        console.error("Error fetching HODs:", error);
      }
    };
    fetchHods();
  }, []);

  useEffect(() => {
    if (employeeType === "HOD") {
      const empId = localStorage.getItem("employeeId");
      onChange({ target: { name: "HOD", value: empId } });
    }
    if (employeeType === "PM") {
      const empId = localStorage.getItem("employeeId");
      onChange({ target: { name: "PM", value: empId } });
    }
  }, []);


useEffect(() => {
  const isEditMode = !!projectNameFromUrl;
  console.log("Is edit mode?", isEditMode);

  if (employeeType !== "PM") return;

  const empCode = formData.empCode || localStorage.getItem("employeeId");
  console.log("Resolved empCode:", empCode);
  if (!empCode) {
    console.log("No empCode found, exiting useEffect");
    return;
  }

  const fetchProjectDetails = async (projectName) => {
    try {
      const res = await api.get(`/project-details/${encodeURIComponent(projectName)}`);
      const data = res.data;
      if (data) {
        console.log("Prefilling dependent fields from project details:", data);
        onChange({ target: { name: "departmentName", value: data.departmentName || "" } });
        onChange({ target: { name: "HOD", value: data.HOD || "" } });
        onChange({ target: { name: "nicOfficerName", value: data.nicOfficerName || "" } });
        onChange({ target: { name: "nicOfficerEmpCode", value: data.nicOfficerEmpCode || "" } });
      }
    } catch (err) {
      console.error("Error fetching project details:", err);
    }
  };

  const fetchProjectAssignments = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/project-assignments/${empCode}`);
      const data = Array.isArray(res.data) ? res.data : [];
      console.log("Projects fetched:", data);

      // ✅ Show popup if no projects
      if (!data.length) {
        console.log("No projects found, showing popup");
        setTimeout(() => {
          Swal.fire({
            title: "Oops!",
            text: "No projects are assigned to you by HOD Reach out to the Hod.",
            icon: "info",
            confirmButtonText: "OK",
          }).then(() => handleDashboardClick());
        }, 50);
        return;
      }

      setProjects(data);
      console.log("Projects found, pre-filling with first project:", data[0]);
      onChange({ target: { name: "projectName", value: data[0].projectName || "" } });
      onChange({ target: { name: "departmentName", value: data[0].deptName || "" } });
      onChange({ target: { name: "HOD", value: data[0].HOD || "" } });
      onChange({ target: { name: "nicOfficerName", value: data[0].projectManagerName || "" } });
      onChange({ target: { name: "nicOfficerEmpCode", value: data[0].empCode || "" } });

    } catch (err) {
      console.error("Error fetching project assignment data:", err);
      setTimeout(() => {
        Swal.fire({
          title: "Error",
          text: "Failed to fetch projects. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }, 50);
    } finally {
      setLoading(false);
    }
  };

  if (isEditMode && projectNameFromUrl) {
    console.log("Edit mode: Prefilling fields from formData or URL");
    setProjects([{ projectName: formData.projectName || projectNameFromUrl || "" }]);
    onChange({ target: { name: "projectName", value: formData.projectName || projectNameFromUrl || "" } });
    onChange({ target: { name: "departmentName", value: formData.departmentName || "" } });
    onChange({ target: { name: "HOD", value: formData.HOD || "" } });
    onChange({ target: { name: "nicOfficerName", value: formData.nicOfficerName || "" } });
    onChange({ target: { name: "nicOfficerEmpCode", value: formData.nicOfficerEmpCode || "" } });

    fetchProjectDetails(projectNameFromUrl);

  } else {
    console.log("Non-edit mode: Fetching project assignments...");
    fetchProjectAssignments();
  }
}, [employeeType, formData.empCode, projectNameFromUrl]);



  const handleProjectSelect = (e) => {
    const selectedProject = projects.find(
      (p) => p.projectName === e.target.value
    );
    if (selectedProject) {
      onChange({
        target: { name: "projectName", value: selectedProject.projectName },
      });
      onChange({
        target: {
          name: "departmentName",
          value: selectedProject.deptName || "",
        },
      });
      onChange({ target: { name: "HOD", value: selectedProject.HOD || "" } });
      onChange({
        target: {
          name: "nicOfficerName",
          value: selectedProject.projectManagerName || "",
        },
      });
      onChange({
        target: {
          name: "nicOfficerEmpCode",
          value: selectedProject.empCode || "",
        },
      });
    } else {
      onChange({ target: { name: "projectName", value: "" } });
    }
  };

  const handleDashboardClick = async () => {
    setLoading(true);
    try {
      const empCode = formData.empCode || localStorage.getItem("employeeId");
      const url = `/dashboard/by-type/${empCode}?employeeType=${employeeType}`;
      const response = await api.get(url, { withCredentials: true });

      if (response.status >= 200 && response.status < 300) {
        navigate("/dashboard", {
          state: {
            fetchedProjects: response.data,
            employeeId: empCode,
            employeeType,
          },
        });
      } else {
        toast.error(`Failed to fetch projects. Status: ${response.status}`);
      }
    } catch (err) {
      toast.error(`Error fetching projects: ${err.message}`);
    } finally {
      setLoading(false);
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
      if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
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
              {/* <div className="col-sm-8">
                {employeeType === "PM" ? (
                  <select
                    className={`form-control ${
                      errors.projectName ? "is-invalid" : ""
                    }`}
                    name="projectName"
                    value={formData.projectName || ""}
                    onChange={handleProjectSelect}
                    disabled={loading}
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option
                        key={project.projectName}
                        value={project.projectName}
                      >
                        {project.projectName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className={`form-control ${
                      errors.projectName ? "is-invalid" : ""
                    }`}
                    name="projectName"
                    value={formData.projectName || ""}
                    onChange={onChange}
                  />
                )}
                {errors.projectName && (
                  <div className="invalid-feedback">{errors.projectName}</div>
                )}
              </div> */}

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
  {errors.projectName && (
    <div className="invalid-feedback">{errors.projectName}</div>
  )}
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
                  className={`form-control ${
                    errors.prismId ? "is-invalid" : ""
                  }`}
                  name="prismId"
                  value={formData.prismId || ""}
                  onChange={onChange}
                />
                {errors.prismId && (
                  <div className="invalid-feedback">{errors.prismId}</div>
                )}
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
                  className={`form-control ${
                    errors.departmentName ? "is-invalid" : ""
                  }`}
                  name="departmentName"
                  value={formData.departmentName || ""}
                  onChange={onChange}
                  disabled={employeeType === "PM"}
                />
                {errors.departmentName && (
                  <div className="invalid-feedback">
                    {errors.departmentName}
                  </div>
                )}
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
                {errors.url && (
                  <div className="invalid-feedback">{errors.url}</div>
                )}
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
                  className={`form-control ${
                    errors.publicIp ? "is-invalid" : ""
                  }`}
                  name="publicIp"
                  value={formData.publicIp || ""}
                  onChange={(e) => {
                    onChange(e); // your existing form state update

                    // real-time IP validation
                    const ipRegex =
                      /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
                    if (!ipRegex.test(e.target.value)) {
                      setErrors((prev) => ({
                        ...prev,
                        publicIp: "Invalid IP address",
                      }));
                    } else {
                      setErrors((prev) => ({ ...prev, publicIp: null }));
                    }
                  }}
                />
                {errors.publicIp && (
                  <div className="invalid-feedback">{errors.publicIp}</div>
                )}
              </div>
            </div>
          </div>

          {/* <div className="col-md-6">
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
                {errors.HOD && (
                  <div className="invalid-feedback">{errors.HOD}</div>
                )}
              </div>
            </div>
          </div> */}

          <div className="col-md-6">
            <div className="row align-items-center text-right">
              <div className="col-sm-4 text-center">
                <label className="form-label">HOD Name:</label>
              </div>
              <div className="col-sm-8">
                {/* <select
                  className={`form-control ${errors.HOD ? "is-invalid" : ""}`}
                  name="HOD"
                  value={formData.HOD || ""}
                  onChange={(e) => {
                    const selected = projectHods.find(
                      (h) => h.HOD === e.target.value
                    );
                    onChange({
                      target: { name: "HOD", value: selected?.HOD || "" },
                    });
                    onChange({
                      target: {
                        name: "hodId",
                        value: selected?.employeeId || "",
                      },
                    });
                  }}
                  disabled={employeeType !== "Admin"}
                >
                  <option value="">Select HOD</option>
                  {projectHods.map((hod) => (
                    <option key={hod.employeeId} value={hod.HOD}>
                      {hod.HOD}-{hod.employeeId} 
                    </option>
                  ))}
                </select> */}

                <select
                  className="form-control"
                  name="HOD"
                  value={selectedHodId}
                  onChange={(e) => {
                    const hod = projectHods.find(
                      (h) => h.employeeId === e.target.value
                    );
                    if (hod) {
                      setSelectedHodId(hod.employeeId);
                      setSelectedHodName(hod.HOD);
                      // ✅ Update both HOD name and employeeId
                      onChange({
                        target: { name: "HOD", value: hod.HOD },
                      });
                      onChange({
                        target: { name: "employeeId", value: hod.employeeId },
                      });
                    }
                  }}
                  disabled={employeeType !== "Admin"}
                >
                  <option value="">Select HOD</option>
                  {projectHods.map((hod) => (
                    <option key={hod.employeeId} value={hod.employeeId}>
                      {hod.HOD} ({hod.employeeId})
                    </option>
                  ))}
                </select>

                {errors.HOD && (
                  <div className="invalid-feedback">{errors.HOD}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* NIC Officer Section */}
        <div className="row">
          <div className="col-md-6">
            <h5 className="sub-heading-1">Nodal Officer from NIC:</h5>
            <div className="p-3 border rounded box-1">
              {[
                "nicOfficerName",
                "nicOfficerEmpCode",
                "nicOfficerMob",
                "nicOfficerEmail",
              ].map((field, i) => {
                const labels = ["Name:", "Emp Code:", "Mob:", "Email:"];
                const types = ["text", "text", "text", "email"];
                // Disable Name and Emp Code when PM
                const disableField =
                  (field === "nicOfficerName" ||
                    field === "nicOfficerEmpCode") &&
                  employeeType === "PM";
                return (
                  <div
                    className="row align-items-center text-right"
                    key={field}
                  >
                    <div className="col-sm-4 mb-2">
                      <label className="form-label">{labels[i]}</label>
                    </div>
                    <div className="col-sm-8 mb-2">
                      <input
                        type={types[i]}
                        className={`form-control ${
                          errors[field] ? "is-invalid" : ""
                        }`}
                        name={field}
                        value={formData[field] || ""}
                        onChange={onChange}
                        disabled={disableField}
                        {...(field === "nicOfficerMob" && {
                          maxLength: 10,
                          pattern: "[0-9]{10}",
                          inputMode: "numeric",
                          onInput: (e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                          },
                        })}
                      />
                      {errors[field] && (
                        <div className="invalid-feedback">{errors[field]}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Department Officer Section */}
          <div className="col-md-6">
            <h5 className="sub-heading-1">Nodal Officer from Department:</h5>
            <div className="p-3 border rounded box-1">
              {[
                "deptOfficerName",
                "deptOfficerDesignation",
                "deptOfficerMob",
                "deptOfficerEmail",
              ].map((field, i) => {
                const labels = ["Name:", "Designation:", "Mob:", "Email:"];
                const types = ["text", "text", "text", "email"];
                return (
                  <div
                    className="row align-items-center text-right"
                    key={field}
                  >
                    <div className="col-sm-4 mb-2">
                      <label className="form-label">{labels[i]}</label>
                    </div>
                    <div className="col-sm-8 mb-2">
                      <input
                        type={types[i]}
                        className={`form-control ${
                          errors[field] ? "is-invalid" : ""
                        }`}
                        name={field}
                        value={formData[field] || ""}
                        onChange={(e) => {
                          let value = e.target.value;

                          // Remove non-digit characters and validate if mobile number field
                          if (
                            field === "nicOfficerMob" ||
                            field === "deptOfficerMob"
                          ) {
                            value = value.replace(/\D/g, "");
                            e.target.value = value;

                            // Real-time validation: exactly 10 digits
                            if (!/^\d{10}$/.test(value)) {
                              setErrors((prev) => ({
                                ...prev,
                                [field]: "Invalid mobile number",
                              }));
                            } else {
                              setErrors((prev) => ({ ...prev, [field]: null }));
                            }
                          }

                          onChange(e); // update form state
                        }}
                        {...((field === "nicOfficerMob" ||
                          field === "deptOfficerMob") && {
                          maxLength: 10,
                          pattern: "[0-9]{10}",
                          inputMode: "numeric",
                        })}
                      />
                      {errors[field] && (
                        <div className="invalid-feedback">{errors[field]}</div>
                      )}
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

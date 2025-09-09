
import React, { useState, useEffect } from "react";
import "../css/mvpStyle.css";
import { toast } from "react-toastify";
import api from "../Api";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

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

  // useEffect(() => {
  //   // Fetch HODs from API when component mounts
  //   const fetchHods = async () => {
  //     try {
  //       const response = await api.get("/allhods"); // your API endpoint
  //       if (response.data && response.data.projectHods) {
  //         setProjectHods(response.data.projectHods);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching HODs:", error);
  //     }
  //   };

  //   fetchHods();
  // }, []);

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

  // useEffect(() => {
  //   if (employeeType === "PM") {
  //     const empCode = formData.empCode || localStorage.getItem("employeeId");
  //     if (!empCode) return;

  //     setLoading(true);
  //     api
  //       .get(`/project-assignments/${empCode}`)
  //       .then((res) => {
  //         const data = res.data;

  //         if (data && data.length > 0) {
  //           const project = data[0];
  //           onChange({
  //             target: { name: "projectName", value: project.projectName || "" },
  //           });
  //           onChange({
  //             target: { name: "departmentName", value: project.deptName || "" },
  //           });
  //           onChange({ target: { name: "HOD", value: project.HOD || "" } });
  //           onChange({
  //             target: {
  //               name: "nicOfficerName",
  //               value: project.projectManagerName || "",
  //             },
  //           });
  //           onChange({
  //             target: {
  //               name: "nicOfficerEmpCode",
  //               value: project.empCode || "",
  //             },
  //           });
  //         } else {
  //           // toast.warning("No project data found for your empCode.");
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching project assignment data:", err);
  //         // toast.error("Failed to fetch project assignment data.");
  //       })
  //       .finally(() => setLoading(false));
  //   }
  // }, [employeeType]);

  useEffect(() => {
  console.log("useEffect triggered for fetching PM project details");

  if (employeeType === "PM") {
    console.log("Employee type is PM");

    const empCode = formData.empCode || localStorage.getItem("employeeId");
    console.log("empCode:", empCode);

    if (!empCode) {
      console.warn("empCode is missing, skipping API call");
      return;
    }

    setLoading(true);
    console.log("Fetching project assignments for empCode:", empCode);

    api
      .get(`/project-assignments/${empCode}`)
      .then((res) => {
        console.log("API response received:", res.data);

        const data = res.data;
         if (!data.length) {
            // ❌ Popup when no projects assigned
            Swal.fire({
              title: "No Projects Assigned",
              text: "There are no projects assigned to you by HOD.",
              icon: "info",
              confirmButtonText: "OK",
            });
            return;
          }


        if (data && data.length > 0) {
          const project = data[0];
          console.log("Project found:", project);

          onChange({
            target: { name: "projectName", value: project.projectName || "" },
          });
          onChange({
            target: { name: "departmentName", value: project.deptName || "" },
          });
          onChange({ target: { name: "HOD", value: project.HOD || "" } });
          onChange({
            target: {
              name: "nicOfficerName",
              value: project.projectManagerName || "",
            },
          });
          onChange({
            target: {
              name: "nicOfficerEmpCode",
              value: project.empCode || "",
            },
          });
          console.log("Form data updated with project details");
        } else {
          console.warn("No project data found for this empCode");
          // toast.warning("No project data found for your empCode.");
        }
      })
      .catch((err) => {
        console.error("Error fetching project assignment data:", err);
        // toast.error("Failed to fetch project assignment data.");
      })
      .finally(() => {
        setLoading(false);
        console.log("Finished loading project data");
      });
  } else {
    console.log("Employee type is not PM, skipping API call");
  }
}, [employeeType]);

  useEffect(() => {
    if (employeeType === "PM") {
      const empCode = formData.empCode || localStorage.getItem("employeeId");
      if (!empCode) return;

      setLoading(true);
      api
        .get(`/project-assignments/by-pm/${empCode}`)
        .then((res) => {
          const data = res.data || [];
          setProjects(data);

          if (!data.length) {
            // ❌ Popup when no projects assigned
            Swal.fire({
              title: "No Projects Assigned",
              text: "There are no projects assigned to you by HOD.",
              icon: "info",
              confirmButtonText: "OK",
            });
            return;
          }

          // ✅ Only prefill if we are in EDIT mode (formData.projectName already exists)
          if (formData.projectName) {
            const project = data.find(
              (p) => p.projectName === formData.projectName
            );
            if (project) {
              onChange({
                target: { name: "projectName", value: project.projectName },
              });
              onChange({
                target: {
                  name: "departmentName",
                  value: project.deptName || "",
                },
              });
              onChange({ target: { name: "HOD", value: project.HOD || "" } });
              onChange({
                target: {
                  name: "nicOfficerName",
                  value: project.projectManagerName || "",
                },
              });
              onChange({
                target: {
                  name: "nicOfficerEmpCode",
                  value: project.empCode || "",
                },
              });
            }
          }
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            title: "Error",
            text: "Oops! You don’t have any projects assigned yet. Please reach out to your HOD.",
            icon: "error",
            confirmButtonText: "OK",
          });
        })
        .finally(() => setLoading(false));
    }
  }, [employeeType, formData.empCode, formData.projectName]);





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
              <div className="col-sm-8">
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
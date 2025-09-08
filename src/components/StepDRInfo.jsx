// import React, { useState, useEffect } from "react";
// import "../css/mvpStyle.css";
// import { FaTrash } from "react-icons/fa";
// import Swal from "sweetalert2";   // ✅ import SweetAlert2
// import { toast } from "react-toastify";

// const DRForm = ({
//   formData,
//   setFormData,
//   records = [],
//   setRecords,
//   onPrevious,
//   onSubmit,
// }) => {
//   const [vaForm, setVaForm] = useState({
//     ipAddress: "",
//     dbServerIp: "",
//     purpose: "",
//     vaScore: "",
//     dateOfVA: "",
//     vaReport: null,
//   });

//   // 🧠 Sync records from parent if editing
//   useEffect(() => {
//     if (formData?.vaRecords?.length) {
//       setRecords(formData.vaRecords);
//     }
//   }, [formData, setRecords]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleVaFormChange = (e) => {
//     const { name, value, files } = e.target;
//     setVaForm((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleAddRecord = () => {
//     if (!vaForm.ipAddress || !vaForm.dbServerIp) return;

//     const newRecords = [...records, vaForm];
//     setRecords(newRecords);
//     setFormData((prev) => ({
//       ...prev,
//       vaRecords: newRecords,
//     }));

//     setVaForm({
//       ipAddress: "",
//       dbServerIp: "",
//       purpose: "",
//       vaScore: "",
//       dateOfVA: "",
//       vaReport: null,
//     });
//   };

//   const handleDeleteRecord = (index) => {
//     const updated = records.filter((_, i) => i !== index);
//     setRecords(updated);
//     setFormData((prev) => ({
//       ...prev,
//       vaRecords: updated,
//     }));
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // if (records.length === 0) {
//     //   toast.error("Please add at least one VA record before submitting.");
//     //   return;
//     // }

//     Swal.fire({
      
//       title: "Do you want to submit this form?",
//       // text:"Are you sure you want to submit the form? This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, submit it!",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         if (typeof onSubmit === "function") {
//           onSubmit(e);
//         } else {
//           toast.error("onSubmit is not defined or not a function.");
//         }
//         Swal.fire({
//           title: "Submitted!",
//           text: "Your data has been submitted.",
//           icon: "success",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       }
//     });
//   };

//   return (
//     <div className="container p-4" style={{ backgroundColor: "#f5f8ff" }}>
//       {/* <h3 className="mb-4">DR Information</h3> */}

//       {/* DR Fields */}
//       <div className="row mb-3">
//         <div className="col-md-4">
//           <label>Type of Server Deployment:</label>
//           <select
//             className="form-control"
//             name="serverType"
//             value={formData.serverType || ""}
//             onChange={handleChange}
//           >
//             <option value="">Select</option>
//             <option value="Cloud">Cloud</option>
//               <option value="Co-location">Co-location</option>
//           </select>
//         </div>

//         <div className="col-md-4">
//           <label>Data Centre:</label>
//           <select
//             className="form-control"
//             name="dataCentre"
//             value={formData.dataCentre || ""}
//             onChange={handleChange}
//           >
//             <option value="">Select</option>
//             <option value="NDC">NDC</option>
//             <option value="CDC">CDC</option>
//             <option value="AZURE">AZURE</option>
//             <option value="AWS">AWS</option>
//             <option value="GCP">GCP</option>
//           </select>
//         </div>

//         <div className="col-md-4">
//           <label>Type of Application Deployment:</label>
//           <select
//             className="form-control"
//             name="deployment"
//             value={formData.deployment || ""}
//             onChange={handleChange}
//           >
//             <option value="">-- Select --</option>
//             <option value="Physical Machine">Physical Machine</option>
//             <option value="VM">VM</option>
//             <option value="Container as Service">Container as Service</option>
//             <option value="K8S as Service">K8S as Service</option>
//           </select>
//         </div>
//       </div>

//       <div className="row mb-3">
//         <div className="col-md-4">
//           <label>Location:</label>
//           <select
//             className="form-control"
//             name="location"
//             value={formData.location || ""}
//             onChange={handleChange}
//           >
//             <option value="">-- Select --</option>
//             <option value="Bhubaneswar">Bhubaneswar</option>
//             <option value="Pune">Pune</option>
//             <option value="Delhi">Delhi</option>
//             <option value="Hydrabad">Hydrabad</option>

//           </select>
//         </div>
//         <div className="col-md-4">
//             <label className="form-label">ANTIVIRUS:</label>
//             <select
//               className="form-select"
//               name="antivirus"
//               value={formData.antivirus || ""}
//               onChange={handleChange}
//             >
//               <option value="">Select</option>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </select>
//           </div>
//       </div>


//       {/* <h4>VA Records</h4> */}
// <div className="row g-3">
//   <div className="col-md-4">
//     <label className="form-label">Application IP Address:</label>
//     <input
//       type="text"
//       className="form-control"
//       name="ipAddress"
//       placeholder="Application server IP"
//       value={vaForm.ipAddress}
//       onChange={handleVaFormChange}
//       disabled={formData.deployment === "Container as Service" || formData.deployment === "K8S as Service"}
//     />
//   </div>

//   <div className="col-md-4">
//     <label>DB Server IP:</label>
//     <input
//       type="text"
//       className="form-control"
//       name="dbServerIp"
//       value={vaForm.dbServerIp}
//       onChange={handleVaFormChange}
//       disabled={formData.deployment === "Container as Service" || formData.deployment === "K8S as Service"}
//     />
//   </div>

//   <div className="col-md-4">
//     <label className="form-label">Purpose of Use:</label>
//     <input
//       type="text"
//       className="form-control"
//       name="purpose"
//       value={vaForm.purpose}
//       onChange={handleVaFormChange}
//       disabled={formData.deployment === "Container as Service" || formData.deployment === "K8S as Service"}
//     />
//   </div>

//   <div className="col-md-4">
//     <label className="form-label">Date of VA:</label>
//     <input
//       type="date"
//       className="form-control"
//       name="dateOfVA"
//       value={vaForm.dateOfVA}
//       onChange={handleVaFormChange}
//       disabled={formData.deployment === "Container as Service" || formData.deployment === "K8S as Service"}
//     />
//   </div>

//   <div className="col-md-4">
//     <label className="form-label">VA Score:</label>
//     <input
//       type="text"
//       className="form-control"
//       name="vaScore"
//       value={vaForm.vaScore}
//       onChange={handleVaFormChange}
//       disabled={formData.deployment === "Container as Service" || formData.deployment === "K8S as Service"}
//     />
//   </div>

//   <div className="col-md-4">
//     <label className="form-label">Upload VA Report:</label>
//     <input
//       type="file"
//       className="form-control"
//       name="vaReport"
//       accept="application/pdf"
//       onChange={handleVaFormChange}
//       disabled={formData.deployment === "Container as Service" || formData.deployment === "K8S as Service"}
//     />
//   </div>

//   <div className="col-md-12 d-flex justify-content-center mt-3">
//     <button
//       className="btn btn-info"
//       type="button"
//       onClick={handleAddRecord}
//       style={{
//         color: "white",
//         border: "none",
//         padding: "8px 70px",
//         borderRadius: "6px",
//         fontWeight: "bold",
//         fontSize: "14px",
//         letterSpacing: "0.5px",
//       }}
//     >
//       Add Record
//     </button>
//   </div>
// </div>


//       {/* VA Table */}
//       <table className="table table-bordered text-center">
//         <thead className="table-light">
//           <tr>
//             <th>S.No.</th>
//             <th>Application IP Address</th>
//             <th>DB Server IP</th>
//             <th>Purpose</th>
//             <th>VA Score</th>
//             <th>Date</th>
//             {/* <th>Report</th> */}
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.length ? (
//             records.map((rec, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{rec.ipAddress}</td>
//                 <td>{rec.dbServerIp}</td>
//                 <td>{rec.purpose}</td>
//                 <td>{rec.vaScore}</td>
//                 <td>{rec.dateOfVA}</td>
//                 {/* <td>
//                   {rec.vaReport ? (
//                     typeof rec.vaReport === "string" ? (
//                       <a href={rec.vaReport} target="_blank" rel="noreferrer">View</a>
//                     ) : (
//                       <a href={URL.createObjectURL(rec.vaReport)} target="_blank" rel="noreferrer">View</a>
//                     )
//                   ) : (
//                     "No File"
//                   )}
//                 </td> */}
//                 <td>
//                   <button
//                     className="btn btn-outline-danger btn-sm"
//                     onClick={() => handleDeleteRecord(index)}
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8">No records added.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Navigation Buttons */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: "20px",
//           marginTop: "30px",
//         }}
//       >
//         <button
//           type="button"
//           className="btn btn-outline-primary"
//           onClick={onPrevious}
//           style={{
//             width: "100px",
//             fontWeight: "bold",
//             color: "white",
//             border: "0 none",
//             borderRadius: "10px",
//             cursor: "pointer",
//             padding: "10px 5px",
//             background: "#a8dced",
//           }}
//         >
//           Previous
//         </button>

//         <button
//           type="button"
//           className="btn btn-success"
//           onClick={handleSubmit}
//           style={{
//             width: "100px",
//             fontWeight: "bold",
//             color: "white",
//             border: "0 none",
//             borderRadius: "10px",
//             cursor: "pointer",
//             padding: "10px 5px",
//             background: "#0099cc",
//           }}
//         >
//           Submit
//         </button>
//       </div> 
//     </div>
//   );
// };

// export default DRForm;


import React, { useState, useEffect } from "react";
import "../css/mvpStyle.css";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2"; // ✅ import SweetAlert2
import { toast } from "react-toastify";
import api from "../Api";
import { useParams } from "react-router-dom";

const DRForm = ({
  formData,
  setFormData,
  records = [],
  setRecords,
  onPrevious,
  onSubmit,
}) => {
  const [vaForm, setVaForm] = useState({
    ipAddress: "",
    dbServerIp: "",
    purpose: "",
    vaScore: "",
    dateOfVA: "",
    vaReport: null,
  });
  const [hasDrInfo, setHasDrInfo] = useState(formData?.hasDrInfo || "No");
  const { projectName: urlProjectName } = useParams();
  const [errors, setErrors] = useState({});
  // 🧠 Sync records from parent if editing
  useEffect(() => {
    if (formData?.vaRecords?.length) {
      setRecords(formData.vaRecords);
    }
  }, [formData, setRecords]);

  // Handle general DR field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle VA form changes
  const handleVaFormChange = (e) => {
    const { name, value, files } = e.target;
    setVaForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  const { projectName: projectNameFromUrl } = useParams(); // 🚀 get projectName from URL
  const empCode = localStorage.getItem("employeeId") || "";
  const handleAddRecord = () => {
    if (!vaForm.ipAddress || !vaForm.dbServerIp) return;

    const newRecords = [...records, vaForm];
    setRecords(newRecords);
    setFormData((prev) => ({
      ...prev,
      vaRecords: newRecords,
    }));

    setVaForm({
      ipAddress: "",
      dbServerIp: "",
      purpose: "",
      vaScore: "",
      dateOfVA: "",
      vaReport: null,
    });
  };

  // Delete VA record
  const handleDeleteRecord = (index) => {
    const updated = records.filter((_, i) => i !== index);
    setRecords(updated);
    setFormData((prev) => ({
      ...prev,
      vaRecords: updated,
    }));
  };





  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const employeeId = localStorage.getItem("employeeId"); // actual ID of the logged-in user
  //   const employeeType = localStorage.getItem("employeeType"); // "PM" | "HOD" | "Admin"
  //   let projectName = "";

  //   try {
  //     if (employeeType === "Admin") {
  //       projectName = urlProjectName || "";
  //     } else if (employeeType === "PM") {
  //       const res = await api.get(`/project-assignments/${employeeId}`);
  //       const pmProject = res.data.find((it) => it.empCode === employeeId);
  //       if (pmProject) projectName = pmProject.projectName;
  //     } else if (employeeType === "HOD") {
  //       const res = await api.get(`/project-assignments/hod/${employeeId}`);
  //       const hodProject = res.data.find((it) => it.employeeId === employeeId);
  //       if (hodProject) projectName = hodProject.projectName;
  //     }

  //     if (!projectName) {
  //       toast.error("Project name is missing!");
  //       return;
  //     }

  //     const confirm = await Swal.fire({
  //       title: "Do you want to submit this form?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, submit it!",
  //       cancelButtonText: "Cancel",
  //     });
  //     if (!confirm.isConfirmed) return;

  //     if (typeof onSubmit === "function") await onSubmit(e);

  //     // Build payload expected by backend:
  //     const payload = { projectName, userType: employeeType };
  //     if (employeeType === "PM") payload.empCode = employeeId; // PM id goes in empCode
  //     if (employeeType === "HOD") payload.employeeId = employeeId; // HOD id goes in employeeId
  //     // Admin: projectName + userType is enough

  //     await api.put("/project/update-status", payload);

  //     Swal.fire({
  //       title: "Submitted!",
  //       text: "Your data has been submitted.",
  //       icon: "success",
  //       timer: 2000,
  //       showConfirmButton: false,
  //     });
  //   } catch (err) {
  //     console.error("Submission error:", err);
  //     toast.error("Something went wrong. Please try again.");
  //   }
  // };



  const handleSubmit = async (e) => {
  e.preventDefault();

  const employeeId = localStorage.getItem("employeeId"); // only for PM/HOD
  const employeeType = localStorage.getItem("employeeType"); // "PM" | "HOD" | "Admin"

  try {
    // 1️⃣ Determine projectName based on role
    let projectName = "";
    switch (employeeType) {
      case "Admin":
        projectName = urlProjectName || "";
        break;
      case "PM": {
        const res = await api.get(`/project-assignments/${employeeId}`);
        const pmProject = res.data.find((it) => it.empCode === employeeId);
        if (pmProject) projectName = pmProject.projectName;
        break;
      }
      case "HOD": {
        const res = await api.get(`/project-assignments/hod/${employeeId}`);
        const hodProject = res.data.find((it) => it.employeeId === employeeId);
        if (hodProject) projectName = hodProject.projectName;
        break;
      }
      default:
        projectName = "";
    }

    if (!projectName) {
      toast.error("Project name is missing!");
      return;
    }

    // 2️⃣ Confirm submission
    const confirm = await Swal.fire({
      title: "Do you want to submit this form?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "Cancel",
    });
    if (!confirm.isConfirmed) return;

    // 3️⃣ Submit the multi-step form first
    if (typeof onSubmit === "function") await onSubmit(e);

    // 4️⃣ Build role-aware payload for backend
    const payload = { projectName, userType: employeeType };

    if (employeeType === "PM") {
      payload.empCode = employeeId;
    } else if (employeeType === "HOD") {
      payload.employeeId = employeeId;
    }
    // ✅ Admin: do NOT include any employeeId

    // 5️⃣ Update project status in backend
    await api.put("/project/update-status", payload);

    // 6️⃣ Notify success
    Swal.fire({
      title: "Submitted!",
      text: "Your data has been submitted.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (err) {
    console.error("Submission error:", err);
    toast.error("Something went wrong. Please try again.");
  }
};

  return (
    <div className="container p-4" style={{ backgroundColor: "#f5f8ff" }}>
      <div className="row mb-3">
        <div className="col-md-4">
          <label>Do you have DR Info?</label>
          <select
            className="form-control"
            value={hasDrInfo}
            onChange={(e) => {
              setHasDrInfo(e.target.value);
              setFormData((prev) => ({
                ...prev,
                hasDrInfo: e.target.value,
              }));
            }}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
      </div>

      {hasDrInfo === "Yes" && (
        <>
          <div className="row mb-3">
            <div className="col-md-4">
              <label>Type of Server Deployment:</label>
              <select
                className="form-control"
                name="serverType"
                value={formData.serverType || ""}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Cloud">Cloud</option>
                <option value="On-Prem">On-Prem</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="col-md-4">
              <label>Data Centre:</label>
              <select
                className="form-control"
                name="dataCentre"
                value={formData.dataCentre || ""}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="NDC">NDC</option>
                <option value="CDC">CDC</option>
                <option value="WDC">WDC</option>
              </select>
            </div>
            <div className="col-md-4">
              <label>Type of Application Deployment:</label>
              <select
                className="form-control"
                name="deployment"
                value={formData.deployment || ""}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Physical Machine">Physical Machine</option>
                <option value="VM">VM</option>
                <option value="Container as Service">
                  Container as Service
                </option>
                <option value="K8S as Service">K8S as Service</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label>Location:</label>
              <select
                className="form-control"
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="BBSR">Bhubaneswar</option>
                <option value="Delhi">Delhi</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Antivirus:</label>
              <select
                className="form-select"
                name="antivirus"
                value={formData.antivirus || ""}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Application IP Address:</label>
              <input
                type="text"
                className={`form-control ${
                  errors.ipAddress ? "is-invalid" : ""
                }`}
                name="ipAddress"
                placeholder="Application server IP"
                value={vaForm.ipAddress || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  handleVaFormChange(e); // update vaForm state

                  // Real-time IPv4 validation
                  const ipRegex =
                    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
                  if (!ipRegex.test(value)) {
                    setErrors((prev) => ({
                      ...prev,
                      ipAddress: "Invalid IP address",
                    }));
                  } else {
                    setErrors((prev) => ({ ...prev, ipAddress: null }));
                  }
                }}
                disabled={
                  formData.deployment === "Container as Service" ||
                  formData.deployment === "K8S as Service"
                }
              />
              {errors.ipAddress && (
                <div className="invalid-feedback">{errors.ipAddress}</div>
              )}
            </div>

            <div className="col-md-4">
              <label>DB Server IP:</label>
              <input
                type="text"
                className={`form-control ${
                  errors.dbServerIp ? "is-invalid" : ""
                }`}
                name="dbServerIp"
                value={vaForm.dbServerIp || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  handleVaFormChange(e); // update vaForm state

                  // Real-time IPv4 validation
                  const ipRegex =
                    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
                  if (!ipRegex.test(value)) {
                    setErrors((prev) => ({
                      ...prev,
                      dbServerIp: "Invalid IP address",
                    }));
                  } else {
                    setErrors((prev) => ({ ...prev, dbServerIp: null }));
                  }
                }}
                disabled={
                  formData.deployment === "Container as Service" ||
                  formData.deployment === "K8S as Service"
                }
              />
              {errors.dbServerIp && (
                <div className="invalid-feedback">{errors.dbServerIp}</div>
              )}
            </div>

            <div className="col-md-4">
              <label className="form-label">Purpose of Use:</label>
              <input
                type="text"
                className="form-control"
                name="purpose"
                value={vaForm.purpose}
                onChange={handleVaFormChange}
                disabled={
                  formData.deployment === "Container as Service" ||
                  formData.deployment === "K8S as Service"
                }
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Date of VA:</label>
              <input
                type="date"
                className="form-control"
                name="dateOfVA"
                value={vaForm.dateOfVA}
                onChange={handleVaFormChange}
                disabled={
                  formData.deployment === "Container as Service" ||
                  formData.deployment === "K8S as Service"
                }
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">VA Score:</label>
              <input
                type="text"
                className="form-control"
                name="vaScore"
                value={vaForm.vaScore}
                onChange={handleVaFormChange}
                disabled={
                  formData.deployment === "Container as Service" ||
                  formData.deployment === "K8S as Service"
                }
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Upload VA Report:</label>
              <input
                type="file"
                className="form-control"
                name="vaReport"
                accept="application/pdf"
                onChange={handleVaFormChange}
                disabled={
                  formData.deployment === "Container as Service" ||
                  formData.deployment === "K8S as Service"
                }
              />
            </div>
            <div className="col-md-12 d-flex justify-content-center mt-3">
              <button
                className="btn btn-info"
                type="button"
                onClick={handleAddRecord}
                style={{
                  color: "white",
                  border: "none",
                  padding: "8px 70px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                }}
              >
                Add Record
              </button>
            </div>
          </div>
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>S.No.</th>
                <th>Application IP Address</th>
                <th>DB Server IP</th>
                <th>Purpose</th>
                <th>VA Score</th>
                <th>Date</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {records.length ? (
                records.map((rec, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{rec.ipAddress}</td>
                    <td>{rec.dbServerIp}</td>
                    <td>{rec.purpose}</td>
                    <td>{rec.vaScore}</td>
                    <td>{rec.dateOfVA}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteRecord(index)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No records added.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={onPrevious}
          style={{
            width: "100px",
            fontWeight: "bold",
            color: "white",
            border: "0 none",
            borderRadius: "10px",
            cursor: "pointer",
            padding: "10px 5px",
            background: "#a8dced",
          }}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
          style={{
            width: "100px",
            fontWeight: "bold",
            color: "white",
            border: "0 none",
            borderRadius: "10px",
            cursor: "pointer",
            padding: "10px 5px",
            background: "#0099cc",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DRForm;

// import React from "react";
// import { Link } from "react-router-dom";
// import "../css/mvpStyle.css";
// const StepInfrastructure = ({
//   formData = {},
//   onChange,
//   onAddGitUrl,
//   onDeleteGitUrl,
//   gitUrls = [],
//   onAddVa,
//   vaRecords = [],
//   onVaFileChange,
//   onDeleteVa,
//   onNext,
//   onPrevious,
//   onSubmit,
// }) => (
//   <fieldset>
//     {/* <h3>Infrastructure</h3> */}
//     <div className="form-section">
//       {/* Server Info Row */}
//       <div className="row g-3">
//         <div className="col-md-4">
//           <div className="row align-items-center">
//             <div className="col-sm-4 text-center">
//               <label className="form-label">Type of Server:</label>
//             </div>
//             <div className="col-sm-8">
//               <select
//                 className="form-select"
//                 name="serverType"
//                 value={formData.serverType || "Cloud"}
//                 onChange={onChange}
//               >
//                 <option value="Cloud">Cloud</option>
//                 <option value="Co-location">Co-location</option>
//               </select>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="row align-items-center">
//             <div className="col-sm-4 text-center">
//               <label className="form-label">Data Centre :</label>
//             </div>
//             <div className="col-sm-8">
//               <select
//                 className="form-select"
//                 name="dataCentre"
//                 value={formData.dataCentre || "NDC"}
//                 onChange={onChange}
//               >
//                 <option value="NDC">NDC</option>
//                 <option value="SDC">SDC</option>
//                 <option value="GCP">GCP</option>
//                 <option value="Azure">Azure</option>
//                 <option value="AWS">AWS</option>
//               </select>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="row align-items-center">
//             <div className="col-sm-4 text-center">
//               <label className="form-label">Deployment:</label>
//             </div>
//             <div className="col-sm-8">
//               <select
//                 className="form-select"
//                 name="deployment"
//                 value={formData.deployment || "VM"}
//                 onChange={onChange}
//               >
//                 <option value="VM">VM</option>
//                 <option value="Container as Service">Container as Service</option>
//                 <option value="K8S as Service">K8S as Service</option>
//                 <option value="Physical Machine">Physical Machine</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Data Centre and Git URL */}
//       <div className="row mt-3">
//         <div className="col-md-4">
//           <div className="row align-items-center">
//             <div className="col-sm-4 text-center">
//               <label className="form-label">Location:</label>
//             </div>
//             <div className="col-sm-8">
//               <select
//                 className="form-select"
//                 name="location"
//                 value={formData.location || "BBSR"}
//                 onChange={onChange}
//               >
//                 <option value="BBSR">BBSR</option>
//                 <option value="Delhi">Delhi</option>
//               </select>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-8">
//           <div className="row">
//             <div className="col-sm-2 text-center">
//               <label className="form-label">Git URL:</label>
//             </div>
//             <div className="col-sm-8">
//               <input
//                 type="text"
//                 className="form-control"
//                 name="gitUrl"
//                 placeholder="Enter Git URL"
//                 value={formData.gitUrl || ""}
//                 onChange={onChange}
//               />
//               <div className="mt-2">
//                 {gitUrls.map((url, idx) => (
//                   <div key={idx}>
//                     {url}{" "}
//                     <Link
                      
//                       className="text-danger"
//                       onClick={e => {
//                         e.preventDefault();
//                         onDeleteGitUrl(idx);
//                       }}
//                     >
//                       Delete
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="col-md-2">
//               <button className="btn btn-primary w-100" type="button" onClick={onAddGitUrl}>
//                 ADD
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* VA Details */}
//       <div className="row mt-4 g-3">
//         <div className="col-md-4">
//           <div className="row align-items-center">
//             <div className="col-sm-4 text-center">
//               <label className="form-label">Application Server Private IP:</label>
//             </div>
//             <div className="col-sm-8">
//               <input
//                 type="text"
//                 className="form-control"
//                 name="appServerIp"
//                 value={formData.appServerIp || ""}
//                 onChange={onChange}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="row align-items-center">
//             <div className="col-sm-4 text-center">
//               <label className="form-label">Database Server Private IP:</label>
//             </div>
//             <div className="col-sm-8">
//               <input
//                 type="text"
//                 className="form-control"
//                 name="dbServerIp"
//                 value={formData.dbServerIp || ""}
//                 onChange={onChange}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="row align-items-center">
//             <div className="col-sm-4 text-center">
//               <label className="form-label">Date of VA:</label>
//             </div>
//             <div className="col-sm-8">
//               <input
//                 type="date"
//                 className="form-control"
//                 name="vaDate"
//                 value={formData.vaDate || ""}
//                 onChange={onChange}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="row align-items-center">
//             <div className="col-sm-4 text-center">
//               <label className="form-label">VA Score:</label>
//             </div>
//             <div className="col-sm-8">
//               <input
//                 type="text"
//                 className="form-control"
//                 name="vaScore"
//                 value={formData.vaScore || ""}
//                 onChange={onChange}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="row align-items-center">
//             <div className="col-sm-4 text-center">
//               <label className="form-label">Upload VA Audit Report:</label>
//             </div>
//             <div className="col-sm-8">
//               <input
//                 type="file"
//                 className="form-control"
//                 name="vaReport"
//                 onChange={onVaFileChange}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4 d-flex align-items-end">
//           <button className="btn btn-primary w-100" type="button" onClick={onAddVa}>
//             ADD
//           </button>
//         </div>
//       </div>
//     </div>
//     <div className="table-responsive mt-4">
//       <table className="table table-bordered align-middle">
//         <thead className="table-light">
//           <tr>
//             <th>S.No.</th>
//             <th>IP</th>
//             <th>Purpose</th>
//             <th>VA Score</th>
//             <th>Date of VA</th>
//             <th>&nbsp;</th>
//           </tr>
//         </thead>
//         <tbody>
//           {vaRecords && vaRecords.length > 0 ? (
//             vaRecords.map((record, idx) => (
//               <tr key={idx}>
//                 <td>{idx + 1}</td>
//                 <td>{record.ip}</td>
//                 <td>{record.purpose}</td>
//                 <td>{record.vaScore}</td>
//                 <td>{record.vaDate}</td>
//                 <td>
//                   <button
//                     className="icon-btn text-danger"
//                     style={{ border: "none", background: "none" }}
//                     title="Delete"
//                     type="button"
//                     onClick={() => onDeleteVa(idx)}
//                   >
//                     <i className="fa-regular fa-trash-can"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={6} className="text-center">
//                 No records found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//     <input
//       type="button"
//       name="previous"
//       className="previous action-button-previous btn btn-primary"
//       value="Previous"
//       onClick={onPrevious}
//     />
//     <input
//       type="submit"
//       name="submit"
//       className="submit action-button btn btn-primary"
//       value="Submit"
//       onClick={onSubmit}
//     />
//   </fieldset>
// );

// export default StepInfrastructure;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/mvpStyle.css";

const StepInfrastructure = ({
  formData = {},
  onChange,
  onAddVa,
  vaRecords = [],
  onVaFileChange,
  onDeleteVa,
  onNext,
  onPrevious,
  onSubmit,
}) => {
  const [gitUrls, setGitUrls] = useState([]);
  const [newGitUrl, setNewGitUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddGitUrl = () => {
    if (newGitUrl.trim()) {
      setGitUrls(prev => [...prev, newGitUrl.trim()]);
      setNewGitUrl("");
    }
  };

  const handleDeleteGitUrl = (index) => {
    setGitUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitInfra = async () => {
    if (!formData.appServerIp || !formData.dbServerIp || !formData.vaDate || !formData.vaScore) {
      alert("Please fill all required fields before submitting.");
      return;
    }

    const payload = {
      Infra: {
        typeOfServer: formData.serverType,
        location: formData.location,
        deployment: formData.deployment,
        dataCentre: formData.dataCentre,
        giturl: gitUrls,
        ipAddress: formData.appServerIp,
        dbIpAddress: formData.dbServerIp,
        purposeOfUse: vaRecords.map(r => r.purpose).join(", "),
        vaScore: formData.vaScore,
        dateOfVA: formData.vaDate,
        additionalInfra: vaRecords.map(record => ({
          ip: record.ip,
          purpose: record.purpose,
          vaScore: record.vaScore,
          vaDate: record.vaDate,
        })),
      },
    };

    try {
      setSubmitting(true);
      const res = await axios.post("http://localhost:5000/assets/createAsset", payload);
      console.log("Asset Created:", res.data);
      alert("Infrastructure submitted successfully.");
      if (onSubmit) onSubmit();
    } catch (err) {
      console.error("Error submitting infrastructure:", err);
      alert("Error submitting infrastructure. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <fieldset>
       {/* <h3>Infrastructure</h3> */}
    <div className="form-section">
      {/* Server Info Row */}
      <div className="row g-3">
        <div className="col-md-4">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Type of Server:</label>
            </div>
            <div className="col-sm-8">
              <select
                className="form-select"
                name="serverType"
                value={formData.serverType || "Cloud"}
                onChange={onChange}
              >
                <option value="Cloud">Cloud</option>
                <option value="Co-location">Co-location</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Data Centre :</label>
            </div>
            <div className="col-sm-8">
              <select
                className="form-select"
                name="dataCentre"
                value={formData.dataCentre || "NDC"}
                onChange={onChange}
              >
                <option value="NDC">NDC</option>
                <option value="SDC">SDC</option>
                <option value="GCP">GCP</option>
                <option value="Azure">Azure</option>
                <option value="AWS">AWS</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Deployment:</label>
            </div>
            <div className="col-sm-8">
              <select
                className="form-select"
                name="deployment"
                value={formData.deployment || "VM"}
                onChange={onChange}
              >
                <option value="VM">VM</option>
                <option value="Container as Service">Container as Service</option>
                <option value="K8S as Service">K8S as Service</option>
                <option value="Physical Machine">Physical Machine</option>
              </select>
            </div>
          </div>
        </div>
      </div>

        {/* Location & Git URL */}
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="row align-items-center">
              <div className="col-sm-4 text-center">
                <label className="form-label">Location:</label>
              </div>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  name="location"
                  value={formData.location || "BBSR"}
                  onChange={onChange}
                >
                  <option value="BBSR">BBSR</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="row">
              <div className="col-sm-2 text-center">
                <label className="form-label">Git URL:</label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Git URL"
                  value={newGitUrl}
                  onChange={(e) => setNewGitUrl(e.target.value)}
                />
                <div className="mt-2">
                  {gitUrls.map((url, idx) => (
                    <div key={idx}>
                      {url}{" "}
                      <Link
                        to="#"
                        className="text-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteGitUrl(idx);
                        }}
                      >
                        Delete
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary w-100"
                  type="button"
                  onClick={handleAddGitUrl}
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* VA Details */}
        <div className="row mt-4 g-3">
          <div className="col-md-4">
            <label className="form-label">Application Server Private IP:</label>
            <input
              type="text"
              className="form-control"
              name="appServerIp"
              value={formData.appServerIp || ""}
              onChange={onChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Database Server Private IP:</label>
            <input
              type="text"
              className="form-control"
              name="dbServerIp"
              value={formData.dbServerIp || ""}
              onChange={onChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Date of VA:</label>
            <input
              type="date"
              className="form-control"
              name="vaDate"
              value={formData.vaDate || ""}
              onChange={onChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">VA Score:</label>
            <input
              type="text"
              className="form-control"
              name="vaScore"
              value={formData.vaScore || ""}
              onChange={onChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Upload VA Audit Report:</label>
            <input
              type="file"
              className="form-control"
              name="vaReport"
              onChange={onVaFileChange}
            />
          </div>

          <div className="col-md-4 d-flex align-items-end">
            <button className="btn btn-primary w-100" type="button" onClick={onAddVa}>
              ADD
            </button>
          </div>
        </div>

        {/* VA Table */}
        <div className="table-responsive mt-4">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>S.No.</th>
                <th>IP</th>
                <th>Purpose</th>
                <th>VA Score</th>
                <th>Date of VA</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {vaRecords && vaRecords.length > 0 ? (
                vaRecords.map((record, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{record.ip}</td>
                    <td>{record.purpose}</td>
                    <td>{record.vaScore}</td>
                    <td>{record.vaDate}</td>
                    <td>
                      <button
                        className="icon-btn text-danger"
                        style={{ border: "none", background: "none" }}
                        title="Delete"
                        type="button"
                        onClick={() => onDeleteVa(idx)}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-3">
        <input
          type="button"
          name="previous"
          className="previous action-button-previous btn btn-primary"
          value="Previous"
          onClick={onPrevious}
        />
        <button
          className="submit action-button btn btn-primary"
          type="button"
          onClick={handleSubmitInfra}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </fieldset>
  );
};

export default StepInfrastructure;
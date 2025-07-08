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
//   onPrevious,
//   onSubmit,
// }) => (
  
//   <fieldset>
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
//                 name="typeOfServer"  // Changed to match backend
//                 value={formData.typeOfServer || "select"}
//                 onChange={onChange}
//               >
//                  <option value="">Select</option>
//                 <option value="Cloud">Cloud</option>
//                 <option value="Co-location">Co-location</option>
//               </select>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="row align-items-center">
//             <div className="col-sm-4 text-center">
//               <label className="form-label">Data Centre:</label>
//             </div>
//             <div className="col-sm-8">
//               <select
//                 className="form-select"
//                 name="dataCentre"
//                 value={formData.dataCentre || "select"}
//                 onChange={onChange}
//               >
//                 <option value="">Select</option>
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
//                 value={formData.deployment || "select"}
//                 onChange={onChange}
//               >
//                 <option value="">Select</option>
//                 <option value="VM">VM</option>
//                 <option value="Container as Service">Container as Service</option>
//                 <option value="K8S as Service">K8S as Service</option>
//                 <option value="Physical Machine">Physical Machine</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Location and Git URL */}
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
//                 value={formData.location || "Select"}
//                 onChange={onChange}
//               >
//                 <option value="">Select</option>
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
//                       onClick={(e) => {
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
//               <button 
//                 className="btn btn-primary w-100" 
//                 type="button" 
//                 onClick={onAddGitUrl}
//               >
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
//               <label className="form-label">IP Address:</label>
//             </div>
//             <div className="col-sm-8">
//               <input
//                 type="text"
//                 className="form-control"
//                 name="ipAddress"  // Changed to match backend
//                 value={formData.ipAddress || ""}
//                 onChange={onChange}
//                 placeholder="Application server IP"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="row align-items-center">
//             <div className="col-sm-4 text-center">
//               <label className="form-label">Purpose of Use:</label>
//             </div>
//             <div className="col-sm-8">
//               <input
//                 type="text"
//                 className="form-control"
//                 name="purposeOfUse"  // Changed to match backend
//                 value={formData.purposeOfUse}
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
//                 name="dateOfVA"  // Changed to match backend
//                 value={formData.dateOfVA || ""}
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
//               <label className="form-label">Upload VA Report:</label>
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
//           <button 
//             className="btn btn-primary w-100" 
//             type="button" 
//             onClick={onAddVa}
//           >
//             ADD
//           </button>
//         </div>
//       </div>
//     </div>

//    {/* VA Records Table */}
// <div className="table-responsive mt-4">
//   <table className="table table-bordered align-middle">
//     <thead className="table-light">
//       <tr>
//         <th>S.No.</th>
//         <th>IP Address</th>
//         <th>Purpose of Use</th>
//         <th>VA Score</th>
//         <th>Date of VA</th>
//         <th>Action</th>
//       </tr>
//     </thead>
//     <tbody>
//       {vaRecords && vaRecords.length > 0 ? (
//         vaRecords.map((record, idx) => (
//           <tr key={idx}>
//             <td>{idx + 1}</td>
//             <td>{record.ipAddress || 'N/A'}</td>
//             <td>{record.purposeOfUse }</td>
//             <td>{record.vaScore || 'N/A'}</td>
//             <td>
//               {record.dateOfVA ? 
//                 new Date(record.dateOfVA).toLocaleDateString() : 
//                 'N/A'
//               }
//             </td>
//             <td>
//               <button
//                 className="icon-btn text-danger"
//                 style={{ border: "none", background: "none" }}
//                 title="Delete"
//                 type="button"
//                 onClick={() => onDeleteVa(idx)}
//               >
//                 <i className="bi bi-trash"></i>
//               </button>
//               {record.vaReport && (
//                 <a 
//                   href={`/va-reports/${record.vaReport}`} 
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="ms-2"
//                 >
//                   <i className="fa-regular fa-file-pdf"></i>
//                 </a>
//               )}
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr>
//           <td colSpan={6} className="text-center">
//             No records found.
//           </td>
//         </tr>
//       )}
//     </tbody>
//   </table>
// </div>

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
import "../css/mvpStyle.css";

const API = "http://localhost:5000"; // Replace with your backend API base URL

const StepInfrastructure = ({
  formData = {},
  onChange,
  onAddGitUrl,
  onDeleteGitUrl,
  gitUrls = [],
  onAddVa,
  vaRecords = [],
  onVaFileChange,
  onDeleteVa,
  onPrevious,
  onSubmit,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const handleViewPdf = (filename) => {
    if (!filename) return;
    setPdfUrl(`${API}/va-reports/${filename}`);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPdfUrl("");
  };

  return (
    <fieldset>
      <div className="form-section">
        {/* Server Info */}
        <div className="row g-3">
          <div className="col-md-4">
            <div className="row align-items-center">
              <div className="col-sm-4 text-center">
                <label className="form-label">Type of Server:</label>
              </div>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  name="typeOfServer"
                  value={formData.typeOfServer || ""}
                  onChange={onChange}
                >
                  <option value="">Select</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Co-location">Co-location</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="row align-items-center">
              <div className="col-sm-4 text-center">
                <label className="form-label">Data Centre:</label>
              </div>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  name="dataCentre"
                  value={formData.dataCentre || ""}
                  onChange={onChange}
                >
                  <option value="">Select</option>
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
                  value={formData.deployment || ""}
                  onChange={onChange}
                >
                  <option value="">Select</option>
                  <option value="VM">VM</option>
                  <option value="Container as Service">Container as Service</option>
                  <option value="K8S as Service">K8S as Service</option>
                  <option value="Physical Machine">Physical Machine</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Location and Git URL */}
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
                  value={formData.location || ""}
                  onChange={onChange}
                >
                  <option value="">Select</option>
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
                  name="gitUrl"
                  placeholder="Enter Git URL"
                  value={formData.gitUrl || ""}
                  onChange={onChange}
                />
                <div className="mt-2">
                  {gitUrls.map((url, idx) => (
                    <div key={idx}>
                      {url}{" "}
                      <Link
                        className="text-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          onDeleteGitUrl(idx);
                        }}
                      >
                        Delete
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary w-100" type="button" onClick={onAddGitUrl}>
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* VA Info */}
        <div className="row mt-4 g-3">
          <div className="col-md-4">
            <div className="row align-items-center">
              <div className="col-sm-4 text-center">
                <label className="form-label">IP Address:</label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  name="ipAddress"
                  placeholder="Application server IP"
                  value={formData.ipAddress || ""}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="row align-items-center">
              <div className="col-sm-4 text-center">
                <label className="form-label">Purpose of Use:</label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  name="purposeOfUse"
                  value={formData.purposeOfUse || ""}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="row align-items-center">
              <div className="col-sm-4 text-center">
                <label className="form-label">Date of VA:</label>
              </div>
              <div className="col-sm-8">
                <input
                  type="date"
                  className="form-control"
                  name="dateOfVA"
                  value={formData.dateOfVA || ""}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="row align-items-center">
              <div className="col-sm-4 text-center">
                <label className="form-label">VA Score:</label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  name="vaScore"
                  value={formData.vaScore || ""}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="row align-items-center">
              <div className="col-sm-4 text-center">
                <label className="form-label">Upload VA Report:</label>
              </div>
              <div className="col-sm-8">
                <input
                  type="file"
                  className="form-control"
                  name="vaReport"
                  onChange={onVaFileChange}
                />
              </div>
            </div>
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
                <th>IP Address</th>
                <th>Purpose of Use</th>
                <th>VA Score</th>
                <th>Date of VA</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vaRecords && vaRecords.length > 0 ? (
                vaRecords.map((record, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{record.ipAddress || "N/A"}</td>
                    <td>{record.purposeOfUse || "N/A"}</td>
                    <td>{record.vaScore || "N/A"}</td>
                    <td>
                      {record.dateOfVA
                        ? new Date(record.dateOfVA).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <button
                        className="icon-btn text-danger"
                        style={{ border: "none", background: "none" }}
                        title="Delete"
                        type="button"
                        onClick={() => onDeleteVa(idx)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      {record.vaReport && (
                        <button
                          className="btn btn-link p-0 text-danger ms-2"
                          type="button"
                          onClick={() => handleViewPdf(record.vaReport)}
                          title="View VA Report"
                        >
                          <i className="bi bi-file-earmark-pdf fs-5"></i>
                        </button>
                      )}
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

        <input
          type="button"
          name="previous"
          className="previous action-button-previous btn btn-primary"
          value="Previous"
          onClick={onPrevious}
        />
        <input
          type="submit"
          name="submit"
          className="submit action-button btn btn-primary"
          value="Submit"
          onClick={onSubmit}
        />
      </div>

      {/* PDF Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">VA Report PDF</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body" style={{ height: "80vh" }}>
                <iframe
                  src={pdfUrl}
                  title="VA Report PDF"
                  width="100%"
                  height="100%"
                  style={{ border: "none", minHeight: "70vh" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </fieldset>
  );
};

export default StepInfrastructure;

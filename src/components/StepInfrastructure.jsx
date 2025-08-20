
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/mvpStyle.css";
import { toast } from "react-toastify";
import { baseURL } from "../Api";



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
  onNext,
}) => {
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [uploading, setUploading] = useState(false);
 
  const isVaDisabled =
  formData.deployment === "K8S as Service" ||
  formData.deployment === "Container as Service";

  // ✅ Validation logic from your code
  const validate = () => {
    const newErrors = {};
    const { ipAddress, dateOfVA, vaScore, vaReport, dbServer } = formData;

    if (!ipAddress || !/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ipAddress)) {
      newErrors.ipAddress = "Valid IP address is required";
      // toast.error("Valid IP address is required");
    }

    if (!dateOfVA) {
      newErrors.dateOfVA = "Date of VA is required";
      // toast.error("Date of VA is required");
    }
    if (!dbServer || !/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(dbServer)) {
      newErrors.dbServer = "Valid DB Server IP address is required";
    }


    if (!vaScore || isNaN(vaScore) || vaScore < 0 || vaScore > 100) {
      newErrors.vaScore = "Valid VA Score (0–100) is required";
      // toast.error("Valid VA Score (0–100) is required");
    }

    if (!vaReport) {
      newErrors.vaReport = "VA Report file is required";
      // toast.error("VA Report file is required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddVa = () => {
    if (validate()) {
      onAddVa();
      toast.success("VA record added successfully");

      // ✅ Reset all fields correctly
      onChange({ target: { name: "ipAddress", value: "" } });
      onChange({ target: { name: "dateOfVA", value: "" } });
      onChange({ target: { name: "vaScore", value: "" } });
      onChange({ target: { name: "dbServer", value: "" } });
      onChange({ target: { name: "vaReport", value: null } }); // ✅ Correct reset
      setErrors({});
    }
  };




  const handleViewPdf = (filename) => {
    if (!filename || typeof filename !== "string") {
      console.error("Invalid filename provided for PDF view:", filename);
      return;
    }

    const cleanFilename = encodeURIComponent(filename.trim());
    const url = `${baseURL}view-certificate/${cleanFilename}`;
    console.log("PDF URL set to:", url);

    setPdfUrl(url);
    setShowModal(true);
  };


  const closeModal = () => {
    setShowModal(false);
    setPdfUrl("");
  };





  const handleVaFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      // toast.error("No file selected.");
      return;
    }

    if (file.type !== "application/pdf") {
      // toast.error("Only PDF files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("vaReport", file);

    try {
      // const response = await fetch(`${API}/upload-va-report`, {
      const response = await fetch(`${baseURL}upload-va-report`, {

        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const result = await response.json();

      onChange({
        target: { name: "vaReport", value: result.filename },
      });

      // toast.success("VA Report uploaded successfully.");
    } catch (error) {
      console.error("VA Report upload failed:", error);
      // toast.error(`Upload failed: ${error.message}`);
    }
  };

  return (
    <fieldset>
      <div className="form-section">
        {/* Server Info */}
        <div className="row g-3">
          {/* Type of Server */}
          <div className="col-md-4">
            <label className="form-label">Type of Server:</label>
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

          {/* Data Centre */}
          <div className="col-md-4">
            <label className="form-label">Data Centre:</label>
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

          {/* Deployment */}
          <div className="col-md-4">
            <label className="form-label">Deployment:</label>
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

        {/* Location & Git URL */}
        <div className="row mt-3">
          <div className="col-md-4">
            <label className="form-label">Location:</label>
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
          <div className="col-md-4">
            <label className="form-label">ANTIVIRUS:</label>
            <select
              className="form-select"
              name="antivirus"
              value={formData.antivirus || ""}
              onChange={onChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

        </div>

        {/* VA Fields */}
        {/* <div className="row mt-4 g-3">
          <div className="col-md-4">
            <label className="form-label"> APPLICATION IP Address:</label>
            <input
              type="text"
              className={`form-control ${errors.ipAddress ? "is-invalid" : ""}`}
              name="ipAddress"
              placeholder="Application server IP"
              value={formData.ipAddress}
              onChange={onChange}
            />
            {errors.ipAddress && (
              <div className="invalid-feedback">{errors.ipAddress}</div>
            )}
          </div>
          <div className="col-md-4">
            <label>DB Server IP:</label>
            <input
              type="text"
              className="form-control"
              name="dbServer"
              value={formData.dbServer}
              onChange={onChange}
              pattern="^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$"
              title="Enter a valid IPv4 address (e.g., 192.168.1.1)"
              required
            />
            {errors.dbServer && (
              <div className="invalid-feedback">{errors.dbServer}</div>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label">Purpose of Use:</label>
            <input
              type="text"
              className="form-control"
              name="purposeOfUse"
              value={formData.purposeOfUse}
              onChange={onChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Date of VA:</label>
            <input
              type="date"
              className={`form-control ${errors.dateOfVA ? "is-invalid" : ""}`}
              name="dateOfVA"
              value={formData.dateOfVA || ""}
              onChange={onChange}
            />
            {errors.dateOfVA && (
              <div className="invalid-feedback">{errors.dateOfVA}</div>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label">VA Score:</label>
            <input
              type="text"
              className={`form-control ${errors.vaScore ? "is-invalid" : ""}`}
              name="vaScore"
              value={formData.vaScore || ""}
              onChange={onChange}
            />
            {errors.vaScore && (
              <div className="invalid-feedback">{errors.vaScore}</div>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label">Upload VA Report:</label>
            <input
              type="file"
              className={`form-control ${errors.vaReport ? "is-invalid" : ""}`}
              name="vaReport"
              accept="application/pdf"
              onChange={handleVaFileUpload}
            />
            {errors.vaReport && (
              <div className="invalid-feedback">{errors.vaReport}</div>
            )}
          </div>

          <div className="col-md-4 d-flex align-items-end">
            <button
              className="btn btn-primary w-100"
              type="button"
              onClick={handleAddVa}
            >
              ADD
            </button>
          </div>
        </div> */}
<div className="row mt-4 g-3">
  <div className="col-md-4">
    <label className="form-label">Application IP Address:</label>
    <input
      type="text"
      className={`form-control ${errors.ipAddress ? "is-invalid" : ""}`}
      name="ipAddress"
      placeholder="Application server IP"
      value={formData.ipAddress}
      onChange={onChange}
      disabled={isVaDisabled}
    />
    {errors.ipAddress && (
      <div className="invalid-feedback">{errors.ipAddress}</div>
    )}
  </div>

  <div className="col-md-4">
    <label>DB Server IP:</label>
    <input
      type="text"
      className="form-control"
      name="dbServer"
      value={formData.dbServer}
      onChange={onChange}
      disabled={isVaDisabled}
    />
    {errors.dbServer && (
      <div className="invalid-feedback">{errors.dbServer}</div>
    )}
  </div>

  {/* <div className="col-md-4">
    <label className="form-label">Database Server IP:</label>
    <input
      type="text"
      className={`form-control ${errors.dbServerIp ? "is-invalid" : ""}`}
      name="dbServerIp"
      placeholder="Database server IP"
      value={formData.dbServerIp || ""}
      onChange={onChange}
      disabled={isVaDisabled}
    />
    {errors.dbServerIp && (
      <div className="invalid-feedback">{errors.dbServerIp}</div>
    )}
  </div> */}

  <div className="col-md-4">
    <label className="form-label">Purpose of Use:</label>
    <input
      type="text"
      className="form-control"
      name="purposeOfUse"
      value={formData.purposeOfUse}
      onChange={onChange}
      disabled={isVaDisabled}
    />
  </div>

  <div className="col-md-4">
    <label className="form-label">Date of VA:</label>
    <input
      type="date"
      className={`form-control ${errors.dateOfVA ? "is-invalid" : ""}`}
      name="dateOfVA"
      value={formData.dateOfVA || ""}
      onChange={onChange}
      disabled={isVaDisabled}
    />
    {errors.dateOfVA && (
      <div className="invalid-feedback">{errors.dateOfVA}</div>
    )}
  </div>

  <div className="col-md-4">
    <label className="form-label">VA Score:</label>
    <input
      type="text"
      className={`form-control ${errors.vaScore ? "is-invalid" : ""}`}
      name="vaScore"
      value={formData.vaScore || ""}
      onChange={onChange}
      disabled={isVaDisabled}   // ✅ Score disabled for K8S/Container
    />
    {errors.vaScore && (
      <div className="invalid-feedback">{errors.vaScore}</div>
    )}
  </div>

  <div className="col-md-4">
    <label className="form-label">Upload VA Report:</label>
    <input
      type="file"
      className={`form-control ${errors.vaReport ? "is-invalid" : ""}`}
      name="vaReport"
      accept="application/pdf"
      onChange={handleVaFileUpload}
      disabled={isVaDisabled}
    />
    {errors.vaReport && (
      <div className="invalid-feedback">{errors.vaReport}</div>
    )}
  </div>

  <div className="col-md-4 d-flex align-items-end">
    <button
      className="btn btn-primary w-100"
      type="button"
      onClick={handleAddVa}
      disabled={isVaDisabled}  // ✅ Disable Add button for K8S/Container
    >
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
                <th>APPLICATION IP Address</th>
                <th>DB Server IP</th>
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
                    <td>{record.dbServer || "N/A"}</td>
                    <td>{record.purposeOfUse || "Application Server"}</td>
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
                        onClick={() => {
                          onDeleteVa(idx);
                          // toast.info("VA record deleted");
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      {record.vaReport && (
                        <button
                          className="btn btn-link p-0 text-danger ms-2"
                          type="button"
                          onClick={() => {
                            console.log("record.vaReport = ", record.vaReport);
                            handleViewPdf(record.vaReport);
                          }}
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
          onClick={onNext}
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
          Next
        </button>
      </div> 
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
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>

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
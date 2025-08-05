import React, { useState } from "react";
import "../css/mvpStyle.css";
import { toast } from "react-toastify";

const StepSecurityAudit = ({
  formData,
  onChange,
  auditRecords,
  setAuditRecords,
  onNext,
  onPrevious,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [vaReport, setVaReport] = useState(null); // Needed for preview to work
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    if (!formData.auditDate) newErrors.auditDate = "Audit Date is required.";
    if (!formData.expireDate) newErrors.expireDate = "Expire Date is required.";
    if (!formData.auditType) newErrors.auditType = "Audit Type is required.";
    if (!formData.agency) newErrors.agency = "Agency is required.";
    // if (!formData.sslLabScore) newErrors.sslLabScore = "SSL Lab Score is required.";
    // if (!formData.tlsNextExpiry) newErrors.tlsNextExpiry = "TLS Expiry Date is required.";
    if (!formData.certificate || !formData.certificate.filename)
      newErrors.certificate = "Certificate upload is required.";
    if (!vaReport || !vaReport.filename)
      newErrors.vaReport = "VA Report upload is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      toast.error("Please select a valid PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("certificate", file);

    try {
      const response = await fetch("http://localhost:5000/upload-certificate", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("PDF uploaded successfully.");
        onChange({
          target: {
            name: "certificate",
            value: result.filename,
          },
        });
      } else {
        toast.error("Failed to upload PDF: " + result.error);
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Error uploading PDF.");
    }
  };

  const handleAddRecord = () => {
    if (!validateFields()) {
      toast.error("Please fill all required fields.");
      return;
    }

    const newRecord = {
      auditDate: formData.auditDate,
      expireDate: formData.expireDate,
      typeOfAudit: formData.auditType,
      // tlsNextExpiry: formData.tlsNextExpiry,
      auditingAgency: formData.agency,
      // sslLabScore: formData.sslLabScore,
      certificate: formData.certificate,
      vaReport: vaReport,
    };

    setAuditRecords([...auditRecords, newRecord]);

    onChange({ target: { name: "auditDate", value: "" } });
    onChange({ target: { name: "expireDate", value: "" } });
    // onChange({ target: { name: "tlsNextExpiry", value: "" } });
    onChange({ target: { name: "auditType", value: "" } });
    onChange({ target: { name: "agency", value: "" } });
    // onChange({ target: { name: "sslLabScore", value: "" } });
    onChange({ target: { name: "certificate", value: null } });
    setVaReport(null);
    setErrors({});
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPdfUrl(null);
  };

  const handleDelete = (index) => {
    const updated = [...auditRecords];
    updated.splice(index, 1);
    setAuditRecords(updated);
  };

  const handleVAReportUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append("vaReport", file);

    try {
      const res = await fetch("http://localhost:5000/upload-va-report", {
        method: "POST",
        body: formDataUpload,
      });

      const result = await res.json();
      if (res.ok) {
        onChange({
          target: {
            name: "certificate",
            value: {
              filename: result.filename,
            },
          },
        });
        setVaReport({ filename: result.filename });
      } else {
        alert("Upload failed: " + result.error);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload error occurred");
    }
  };

  const handleViewVAReport = () => {
    if (!vaReport?.filename) {
      alert("No file to preview");
      return;
    }

    setPdfUrl(`http://localhost:5000/view-va-report/${vaReport.filename}`);
    setShowModal(true);
  };

  const handleView = async (index) => {
    try {
      const record = auditRecords[index];
      const certFilename = record?.certificate?.filename;

      if (!certFilename) {
        alert("No certificate available for this record.");
        return;
      }

      const previewUrl = `http://localhost:5000/view-va-report/${encodeURIComponent(certFilename)}`;

      const verifyRes = await fetch(previewUrl);
      if (!verifyRes.ok) {
        alert("File not found on server.");
        return;
      }

      setPdfUrl(previewUrl);
      setShowModal(true);
    } catch (err) {
      console.error("Error viewing certificate:", err);
      alert("Error displaying certificate");
    }
  };

  const handleCertificateUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append("certificate", file);

    try {
      const res = await fetch("http://localhost:5000/upload-certificate", {
        method: "POST",
        body: formDataUpload,
      });

      const result = await res.json();

      if (res.ok) {
        onChange({
          target: {
            name: "certificate",
            value: {
              filename: result.filename,
            },
          },
        });
      } else {
        alert("Certificate upload failed: " + result.error);
      }
    } catch (err) {
      console.error("Certificate upload error:", err);
      alert("Certificate upload failed");
    }
  };

  return (
    <fieldset>
      <div className="form-section">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Audit Date</label>
            <input
              type="date"
              className={`form-control ${errors.auditDate ? "is-invalid" : ""}`}
              name="auditDate"
              value={formData.auditDate || ""}
              onChange={onChange}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Expire Date</label>
            <input
              type="date"
              className={`form-control ${errors.expireDate ? "is-invalid" : ""}`}
              name="expireDate"
              value={formData.expireDate || ""}
              onChange={onChange}
              min={formData.auditDate || ""}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Type of Audit</label>
            <select
              className={`form-select ${errors.auditType ? "is-invalid" : ""}`}
              name="auditType"
              value={formData.auditType || ""}
              onChange={onChange}
            >
              <option value="">Select</option>
              <option value="Internal">Internal</option>
              <option value="Third party">Third party</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Auditing Agency</label>
            <select
              className={`form-select ${errors.agency ? "is-invalid" : ""}`}
              name="agency"
              value={formData.agency || ""}
              onChange={onChange}
            >
              <option value="">Select</option>
              <option value="securely">securely</option>
              <option value="pinaki">pinaki</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Upload VA Report (PDF)</label>
            <input
              type="file"
              className={`form-control ${errors.vaReport ? "is-invalid" : ""}`}
              accept="application/pdf"
              onChange={handleVAReportUpload}
            />
            {formData?.certificate?.filename && (
              <button
                type="button"
                className="btn btn-sm btn-link"
                onClick={handleViewVAReport}
              >
                View Uploaded Security audit report
              </button>
            )}
          </div>

          {/* <div className="col-md-6">
            <label className="form-label">SSL Lab Score</label>
            <select
              className={`form-select ${errors.sslLabScore ? "is-invalid" : ""}`}
              name="sslLabScore"
              value={formData.sslLabScore || ""}
              onChange={onChange}
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div> */}

          {/* <div className="col-md-6">
            <label className="form-label"> TLS Expire Date</label>
            <input
              type="date"
              className={`form-control ${errors.tlsNextExpiry ? "is-invalid" : ""}`}
              name="tlsNextExpiry"
              value={formData.tlsNextExpiry || ""}
              onChange={onChange}
            />
          </div> */}
        </div>

        <div className="mt-4 text-center">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAddRecord}
          >
            ADD RECORD
          </button>
        </div>
      </div>

      <div className="table-responsive mt-4">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>S.No.</th>
              <th>Type</th>
              <th>Agency</th>
              <th>Date of Audit</th>
              <th>EXPIRE DATE</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {auditRecords.length > 0 ? (
              auditRecords.map((record, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{record.typeOfAudit}</td>
                  <td>{record.auditingAgency}</td>
                  <td>{record.auditDate}</td>
                  <td>{record.expireDate}</td>
                  <td>
                    <button
                      type="button"
                      className="icon-btn text-primary"
                      onClick={() => handleView(idx)}
                      disabled={
                        !record?.certificate?.filename &&
                        !record?.vaReport?.filename
                      }
                      title={
                        record?.certificate?.filename
                          ? "View Certificate"
                          : record?.vaReport?.filename
                          ? "View VA Report"
                          : "No file"
                      }
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="icon-btn text-danger"
                      onClick={() => handleDelete(idx)}
                    >
                      <i className="bi bi-trash"></i>
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

      {showModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">PDF Preview</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body" style={{ height: "80vh" }}>
                {pdfUrl ? (
                  <embed
                    src={pdfUrl}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                  />
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <input
        type="button"
        className="previous action-button-previous btn btn-primary"
        value="Previous"
        onClick={onPrevious}
      />
      <input
        type="button"
        className="next action-button btn btn-success"
        value="Next"
        onClick={onNext}
        disabled={auditRecords.length === 0}
        title={
          auditRecords.length === 0
            ? "Add at least one record to proceed"
            : "Next"
        }
      />
    </fieldset>
  );
};

export default StepSecurityAudit;
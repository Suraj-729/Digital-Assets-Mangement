
import React, { useState } from "react";
import "../css/mvpStyle.css";

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

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   onChange({ target: { name: "certificate", value: file, files: [file] } });
  // };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please select a valid PDF file.");
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
        alert("PDF uploaded successfully");
  
        // Save the filename in formData
        onChange({
          target: {
            name: "certificate",
            value: result.filename,
          },
        });
      } else {
        alert("Failed to upload PDF: " + result.error);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading PDF");
    }
  };
  
  const handleAddRecord = () => {
    const newRecord = {
      auditDate: formData.auditDate,
      expireDate: formData.expireDate,
      typeOfAudit: formData.auditType,           // ✅ match backend
      tlsNextExpiry: formData.nextExpireDate, 
       // Use auditType consistently
      auditingAgency: formData.agency,
      sslLabScore: formData.sslLabScore,
      certificate: formData.certificate,
    };

    setAuditRecords([...auditRecords, newRecord]);

    // Clear form fields
    onChange({ target: { name: "auditDate", value: "" } });
    onChange({ target: { name: "expireDate", value: "" } });
    onChange({ target: { name: "nextExpireDate", value: "" } });
    onChange({ target: { name: "auditType", value: "" } });
    onChange({ target: { name: "agency", value: "" } });
    onChange({ target: { name: "sslLabScore", value: "" } });
    onChange({ target: { name: "certificate", value: null } });
  };

  // const handleView = (index) => {
  //   const file = auditRecords[index].certificate;
  //   if (file && file.type === "application/pdf") {
  //     const fileURL = URL.createObjectURL(file);
  //     setPdfUrl(fileURL);
  //     setShowModal(true);
  //   } else {
  //     alert("No PDF certificate uploaded.");
  //   }
  // };
  const handleView = (index) => {
    const filename = auditRecords[index].certificate;
    if (!filename) {
      alert("No certificate uploaded.");
      return;
    }
  
    const fileURL = `http://localhost:5000/view-certificate/${filename}`;
    setPdfUrl(fileURL);
    setShowModal(true);
  };
  

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   if (pdfUrl) {
  //     URL.revokeObjectURL(pdfUrl);
  //     setPdfUrl(null);
  //   }
  // };
  const handleCloseModal = () => {
    setShowModal(false);
    setPdfUrl(null);
  };
  
  

  const handleDelete = (index) => {
    const updated = [...auditRecords];
    updated.splice(index, 1);
    setAuditRecords(updated);
  };

  return (
    <fieldset>
      <div className="form-section">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Audit Date</label>
            <input
              type="date"
              className="form-control"
              name="auditDate"
              value={formData.auditDate || ""}
              onChange={onChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Expire Date</label>
            <input
              type="date"
              className="form-control"
              name="expireDate"
              value={formData.expireDate || ""}
              onChange={onChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Type of Audit</label>
            <select
              className="form-select"
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
              className="form-select"
              name="agency"
              value={formData.agency || ""}
              onChange={onChange}
            >
              <option value="">Select</option>
              <option value="Agency 1">Agency 1</option>
              <option value="Agency 2">Agency 2</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Upload Certificate</label>
            <input
              type="file"
              className="form-control"
              name="certificate"
              onChange={handleFileChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">SSL Lab Score</label>
            <select
              className="form-select"
              name="sslLabScore"
              value={formData.sslLabScore || ""}
              onChange={onChange}
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label"> TLS Next Expire Date</label>
            <input
              type="date"
              className="form-control"
              name="nextExpireDate"
              value={formData.nextExpireDate || ""}
              onChange={onChange}
            />
          </div>
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
                  <td>
                    <button
                    type="button"
                      className="icon-btn text-primary"
                      onClick={() => handleView(idx)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>
                  <td>
                    <button
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

      {/* Modal for PDF preview */}
      {showModal && (
        <div>
          {/* Overlay */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.7)",
              zIndex: 1040,
            }}
          />
          {/* Modal */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1050,
              width: "90vw",
              maxWidth: "1000px",
              height: "90vh",
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                padding: "1rem",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5 style={{ margin: 0 }}>PDF Preview</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <iframe
                src={pdfUrl}
                title="PDF Preview"
                // onClick={handleCloseModal}
                width="100%"
                height="100%"
                style={{ border: "none", minHeight: "100%" }}
              ></iframe>
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
      />
    </fieldset>
  );
};

export default StepSecurityAudit;

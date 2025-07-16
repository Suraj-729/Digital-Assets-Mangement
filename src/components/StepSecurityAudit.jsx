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

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   onChange({ target: { name: "certificate", value: file, files: [file] } });
  // };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      // alert("Please select a valid PDF file.");
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
        // alert("PDF uploaded successfully");
        toast.success("PDF uploaded successfully.");

  
        // Save the filename in formData
        onChange({
          target: {
            name: "certificate",
            value: result.filename,
          },
        });
      } else {
        // alert("Failed to upload PDF: " + result.error);
        toast.error("Failed to upload PDF: " + result.error);

      }
    } catch (err) {
      console.error("Upload error:", err);
      // alert("Error uploading PDF");
      toast.error("Error uploading PDF.");

    }
  };

  const handleAddRecord = () => {
    const newRecord = {
      auditDate: formData.auditDate,
      expireDate: formData.expireDate,
      typeOfAudit: formData.auditType, // ✅ match backend
      tlsNextExpiry: formData.nextExpireDate,
      // Use auditType consistently
      auditingAgency: formData.agency,
      sslLabScore: formData.sslLabScore,
      certificate: formData.certificate,
      vaReport: vaReport, // 👈 Added
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
  // const handleView = (index) => {
  //   const filename = auditRecords[index].certificate;
  //   if (!filename) {
  //     // alert("No certificate uploaded.");
  //     toast.warn("No certificate uploaded.");

  //     return;
  //   }
  
  //   const fileURL = `http://localhost:5000/view-certificate/${filename}`;
  //   setPdfUrl(fileURL);
  //   setShowModal(true);
  // };
  

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

  const handleVAReportUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append("vaReport", file); // backend expects this field

    try {
      const res = await fetch("http://localhost:5000/upload-va-report", {
        method: "POST",
        body: formDataUpload,
      });

      const result = await res.json();
      if (res.ok) {
        // Treat VA Report as Certificate
        onChange({
          target: {
            name: "certificate",
            value: {
              filename: result.filename,
            },
          },
        });

        // Optional: also store locally for preview
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

  // const handleView = async (index) => {
  //   try {
  //     const record = auditRecords[index];
  //     const certFilename = record?.certificate?.filename;
  //     const vaFilename = record?.vaReport?.filename;

  //     if (!certFilename && !vaFilename) {
  //       alert("No certificate or VA report available for this record.");
  //       return;
  //     }

  //     // Prioritize showing certificate if available, else VA report
  //     const previewUrl = certFilename
  //       ? `http://localhost:5000/view-certificate/${encodeURIComponent(
  //           certFilename
  //         )}`
  //       : `http://localhost:5000/view-va-report/${encodeURIComponent(
  //           vaFilename
  //         )}`;

  //     const verifyRes = await fetch(previewUrl);
  //     if (!verifyRes.ok) {
  //       alert("File not found on server.");
  //       return;
  //     }

  //     setPdfUrl(previewUrl);
  //     setShowModal(true);
  //   } catch (err) {
  //     console.error("Error viewing file:", err);
  //     alert("Error displaying file.");
  //   }
  // };

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
    className="form-control"
    name="auditDate"
    value={formData.auditDate || ""}
    onChange={onChange}
    max={new Date().toISOString().split("T")[0]} // ✅ today's date in yyyy-mm-dd format
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
    min={formData.auditDate || ""} // Cannot select a date before audit date
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
            <label className="form-label">Upload VA Report (PDF)</label>
            <input
              type="file"
              className="form-control"
              accept="application/pdf"
              onChange={handleVAReportUpload}
            />
            {formData?.certificate?.filename && (
              <button
                type="button"
                className="btn btn-sm btn-link"
                onClick={handleViewVAReport}
              >
                View Uploaded VA Report
              </button>
            )}
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
            <label className="form-label"> TLS Expire Date</label>
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

      {/* Modal for PDF preview */}
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

      {/* PDF Modal */}
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
      />
    </fieldset>
  );
};

export default StepSecurityAudit;

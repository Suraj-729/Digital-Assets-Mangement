import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../../Api";
import "../../css/mvpStyle.css";

const SecurityAudit = ({ securityAudits }) => {
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  console.log("Security Audits Data:", securityAudits);

  // Normalize to array
  const auditsArray = Array.isArray(securityAudits)
    ? securityAudits
    : securityAudits?.securityAudit || [];

  // No data fallback
  if (!auditsArray.length) {
    return (
      <div className="tab-pane fade profile-edit pt-3">
        <div className="alert alert-info">
          No security audit records found for this project.
        </div>
      </div>
    );
  }

  // Format MongoDB or ISO date
  const formatDate = (dateInput) => {
    const rawDate = dateInput?.$date || dateInput;
    const date = new Date(rawDate);
    return isNaN(date.getTime())
      ? "Invalid date"
      : date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  // const handleCertificateClick = (filename) => {
  //   if (!filename) return;
  //   setPdfUrl(`${API}/view-certificate/${filename}`); // ✅ correct GridFS route
  //   setShowModal(true);
  // };
  // const handleVaReportClick = (filename) => {
  //   if (!filename) return;
  //   setPdfUrl(`${API}/view-va-report/${filename}`); // ✅ VA report endpoint
  //   setShowModal(true);
  // };

  const handleCertificateClick = (certificate) => {
    const filename =
      typeof certificate === "string" ? certificate : certificate?.filename;
    if (!filename) return;

    setPdfUrl(`${api}/view-certificate/${filename}`);
    setShowModal(true);
  };

  const handleVaReportClick = (certificate) => {
    const filename =
      typeof certificate === "string" ? certificate : certificate?.filename;
    if (!filename) return;

    setPdfUrl(`${api}/view-va-report/${filename}`);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPdfUrl("");
  };

  return (
    <div className="container-fluid p-3">
      <div className="card shadow-sm border-0">
        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Sl No</th>
                <th>Audit Date</th>
                <th>Expire Date</th>
                <th>Type of Audit</th>
                <th>Agency</th>
                <th>Certificate</th>
                {/* <th>va </th> */}
                <th>SSL Lab Score</th>
                <th>TLS Next Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {auditsArray.length > 0 ? (
                auditsArray.map((audit, index) => {
                  const key = audit["Sl no"] ?? `${audit.typeOfAudit}-${index}`;
                  return (
                    <tr key={key}>
                      <td>{audit["Sl no"] || index + 1}</td>
                      <td>{formatDate(audit.auditDate)}</td>
                      <td>{formatDate(audit.expireDate)}</td>
                      <td>{audit.typeOfAudit || "N/A"}</td>
                      <td>{audit.auditingAgency || "N/A"}</td>
                      {/* Certificate */}
                      <td>
                        {audit.certificate ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-link text-danger p-0 me-2"
                              onClick={() =>
                                handleCertificateClick(
                                  typeof audit.certificate === "string"
                                    ? audit.certificate
                                    : audit.certificate?.filename
                                )
                              }
                              title="View Certificate"
                            >
                              <i className="bi bi-file-earmark-pdf fs-5"></i>
                            </button>

                            <button
                              type="button"
                              className="btn btn-link text-primary p-0"
                              onClick={() =>
                                handleVaReportClick(
                                  typeof audit.certificate === "string"
                                    ? audit.certificate
                                    : audit.certificate?.filename
                                )
                              }
                              title="View VA Report"
                            >
                              <i className="bi bi-file-earmark-text fs-5"></i>
                            </button>
                          </>
                        ) : (
                          "N/A"
                        )}
                      </td>

                      <td>{audit.sslLabScore || "N/A"}</td>
                      <td>{formatDate(audit.tlsNextExpiry)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-muted">
                    No security audit records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for PDF view */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)",
          }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Certificate PDF</h5>
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
                  title="Certificate PDF"
                  width="100%"
                  height="100%"
                  style={{ border: "none", minHeight: "70vh" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

SecurityAudit.propTypes = {
  securityAudits: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        "Sl no": PropTypes.number,
        typeOfAudit: PropTypes.string,
        auditingAgency: PropTypes.string,
        auditDate: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({ $date: PropTypes.string }),
        ]),
        expireDate: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({ $date: PropTypes.string }),
        ]),
        tlsNextExpiry: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({ $date: PropTypes.string }),
        ]),
        sslLabScore: PropTypes.string,
        certificate: PropTypes.string,
      })
    ),
    PropTypes.shape({
      securityAudit: PropTypes.array,
    }),
  ]),
};

export default SecurityAudit;

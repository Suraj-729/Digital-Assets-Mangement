import React from "react";
import PropTypes from "prop-types";

const SecurityAudit = ({ securityAudits }) => {
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
          year: "numeric"
        });
  };

  return (
    // <div >
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Sl No</th>
    //         <th>Audit Date</th>
    //         <th>Expire Date</th>
    //         <th>Type of Audit</th>
    //         <th>Agency</th>
    //         <th>Certificate</th>
    //         <th>SSL Lab Score</th>
    //         <th>TLS Next Expiry</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {auditsArray.map((audit, index) => {
    //         const key = audit["Sl no"] ?? `${audit.typeOfAudit}-${index}`;
    //         return (
    //           <tr key={key}>
    //             <td>{audit["Sl no"] || index + 1}</td>
    //             <td>{formatDate(audit.auditDate)}</td>
    //             <td>{formatDate(audit.expireDate)}</td>
    //             <td>{audit.typeOfAudit || "N/A"}</td>
    //             <td>{audit.auditingAgency || "N/A"}</td>
    //             <td>
    //               {audit.certificate ? (
    //                 <a
    //                   href={`/certificates/${audit.certificate}`}
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                 >
    //                   <i className="bi bi-file-earmark-pdf"></i>
    //                 </a>
    //               ) : (
    //                 "N/A"
    //               )}
    //             </td>
    //             <td>{audit.sslLabScore || "N/A"}</td>
    //             <td>{formatDate(audit.tlsNextExpiry)}</td>
    //           </tr>
    //         );
    //       })}
    //     </tbody>
    //   </table>
    // </div>
    <div className="container-fluid p-3">
  <div className="card shadow-sm border-0">
    {/* <div className="card-header bg-primary text-white"> */}
      {/* <h5 className="mb-0">Security Audit Details</h5> */}
    {/* </div> */}
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
            <th>SSL Lab Score</th>
            <th>TLS Next Expiry</th>
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
                  <td>
                    {audit.certificate ? (
                      <a
                        href={`/certificates/${audit.certificate}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-danger"
                      >
                        <i className="bi bi-file-earmark-pdf fs-5"></i>
                      </a>
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
          PropTypes.shape({ $date: PropTypes.string })
        ]),
        expireDate: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({ $date: PropTypes.string })
        ]),
        tlsNextExpiry: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({ $date: PropTypes.string })
        ]),
        sslLabScore: PropTypes.string,
        certificate: PropTypes.string
      })
    ),
    PropTypes.shape({
      securityAudit: PropTypes.array
    })
  ])
};

export default SecurityAudit;

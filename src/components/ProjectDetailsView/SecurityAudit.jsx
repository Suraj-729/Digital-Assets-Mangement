
import React from "react";
import PropTypes from "prop-types";

const SecurityAudit = ({ securityAudits }) => {
  console.log("Security Audits Data:", securityAudits);

  if (!securityAudits || securityAudits.length === 0) {
    return (
      <div className="tab-pane fade profile-edit pt-3">
        <div className="alert alert-info">
          No security audit records found for this project.
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString?.$date || dateString);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="tab-pane fade profile-edit pt-3">
      <table className="table">
        <thead>
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
          {securityAudits.map((audit, index) => (
            <tr key={audit["Sl no"] || index}>
              <td>{audit["Sl no"] || index + 1}</td>
              <td>{formatDate(audit.auditDate)}</td>
              <td>{formatDate(audit.expireDate)}</td>
              <td>{audit.typeOfAudit || 'N/A'}</td>
              <td>{audit.auditingAgency || 'N/A'}</td>
              <td>
                {audit.certificate ? (
                  <a
                    href={`/certificates/${audit.certificate}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-file-earmark-pdf"></i>
                  </a>
                ) : 'N/A'}
              </td>
              <td>{audit.sslLabScore || 'N/A'}</td>
              <td>{formatDate(audit.tlsNextExpiry)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

SecurityAudit.propTypes = {
  securityAudits: PropTypes.arrayOf(
    PropTypes.shape({
      'Sl no': PropTypes.number,
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
  )
};

export default SecurityAudit;

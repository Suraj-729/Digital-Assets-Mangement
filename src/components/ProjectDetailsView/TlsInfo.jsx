
import React from "react";

const TlsInfo = ({ tlsRecords }) => {
  if (!tlsRecords || tlsRecords.length === 0) {
    return (
      <div className="tab-pane fade show active profile-overview">
        <div className="alert alert-info">No TLS records available.</div>
      </div>
    );
  }

  return (
    <div className="tab-pane fade show active profile-overview">
      <h4>TLS Information</h4>
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>S.No.</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
              <th>Score</th>
              <th>Certificate Procured From</th>
              
            </tr>
          </thead>
          <tbody>
            {tlsRecords.map((record, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{record.issueDate ? new Date(record.issueDate).toLocaleDateString() : "N/A"}</td>
                <td>{record.expiryDate ? new Date(record.expiryDate).toLocaleDateString() : "N/A"}</td>
                <td>{record.score || "N/A"}</td>
                <td>{record.procuredFrom || "N/A"}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TlsInfo;

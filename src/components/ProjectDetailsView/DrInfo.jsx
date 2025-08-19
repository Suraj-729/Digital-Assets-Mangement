import React from "react";

const DrInfo = ({ drData }) => {
  if (!drData) {
    return (
      <div className="tab-pane fade show active profile-overview">
        <div className="alert alert-info">No DR information available.</div>
      </div>
    );
  }

  return (
    <div className="tab-pane fade show active profile-overview">
      <h4>DR Information</h4>
      <div className="row mb-3">
        <div className="col-md-3">
          <p>Type of Server: <b>{drData.serverType || "N/A"}</b></p>
        </div>
        <div className="col-md-3">
          <p>Data Centre: <b>{drData.dataCentre || "N/A"}</b></p>
        </div>
        <div className="col-md-3">
          <p>Deployment: <b>{drData.deployment || "N/A"}</b></p>
        </div>
        <div className="col-md-3">
          <p>Location: <b>{drData.drLocation || "N/A"}</b></p>
        </div>
        <div className="col-md-3">
          <p>ANTIVIRUS: <b>{drData.antivirus || "N/A"}</b></p>
        </div>
      </div>
      {/* <h5>Git URLs</h5> */}
      {/* <ul>
        {(drData.gitUrls || []).map((url, idx) => (
          <li key={idx}>
            <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
          </li>
        ))}
        {(!drData.gitUrls || drData.gitUrls.length === 0) && <li>No Git URLs</li>}
      </ul> */}
      <h5>VA Records</h5>
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>S.No.</th>
              <th>IP Address</th>
              <th>DB Server IP</th>
              <th>Purpose</th>
              <th>VA Score</th>
              <th>Date</th>
              <th>VA Report</th>
            </tr>
          </thead>
          <tbody>
            {(drData.vaRecords || []).map((record, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{record.ipAddress || "N/A"}</td>
                <td>{record.dbServerIp || "N/A"}</td>
                <td>{record.purposeOfUse || "N/A"}</td> {/* <-- use purposeOfUse */}
                <td>{record.vaScore || "N/A"}</td>
                <td>{record.vaDate || record.dateOfVA || "N/A"}</td> {/* <-- support both vaDate and dateOfVA */}
                <td>
                  {record.vaReport ? (
                    typeof record.vaReport === "string" ? (
                      <a href={record.vaReport} target="_blank" rel="noopener noreferrer">View</a>
                    ) : (
                      "No File"
                    )
                  ) : "No File"}
                </td>
              </tr>
            ))}
            {(!drData.vaRecords || drData.vaRecords.length === 0) && (
              <tr>
                <td colSpan="7">No VA records added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DrInfo;
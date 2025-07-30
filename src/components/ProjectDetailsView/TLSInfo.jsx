import React from "react";

const TLSInfo = ({ tlsData }) => (
  <div className="tls-info-container">
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Issue Date</th>
          <th>Expiry Date</th>
          <th>Score</th>
          <th>Certificate Procured From</th>
         
        </tr>
      </thead>
      <tbody>
        {tlsData && tlsData.length > 0 ? (
          tlsData.map((record, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{record.issueDate}</td>
              <td>{record.expiryDate}</td>
              <td>{record.score}</td>
              <td>{record.certificateSource}</td>
             
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-muted text-center">
              No TLS records found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default TLSInfo;
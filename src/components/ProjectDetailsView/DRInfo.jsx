import React from "react";

const DRInfo = ({ drData = [] }) => (
  <div className="dr-info-container">
    <table className="table table-bordered text-center">
      <thead className="table-light">
        <tr>
          <th>S.No.</th>
          <th>IP Address</th>
          <th>Purpose of Use</th>
          <th>VA Score</th>
          <th>Date of VA</th>
          <th>VA Report</th>
        </tr>
      </thead>
      <tbody>
      
             {drData.length > 0 ? (
          drData.map((record, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{record.ipAddress}</td>
              <td>{record.dbServerIp}</td>
              <td>{record.vaScore}</td>
              <td>{record.vaDate}</td>
              <td>
                {record.vaReport ? (
                  <a
                    href={typeof record.vaReport === "string" ? record.vaReport : URL.createObjectURL(record.vaReport)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF
                  </a>
                ) : (
                  "No file"
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No DR records found.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default DRInfo;
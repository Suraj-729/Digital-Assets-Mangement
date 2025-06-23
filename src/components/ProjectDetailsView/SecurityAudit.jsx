import React from "react";

const SecurityAudit = () => (
  <div className="tab-pane fade profile-edit pt-3">
    <table className="table">
      <thead>
        <tr>
          <th>Audit Date</th>
          <th>Expire Date</th>
          <th>Type of Audit</th>
          <th>Agency</th>
          <th>Certificate</th>
          <th>SSL Lab Score</th>
          <th>Next Expire Date</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4].map((_, i) => (
          <tr key={i}>
            <td>17 Jun 2025</td>
            <td>19 Jun 2027</td>
            <td>Internal</td>
            <td>Agency 1</td>
            <td><a href="#"><i className="bi bi-file-earmark-pdf"></i></a></td>
            <td>A+</td>
            <td>19 Jun 2027</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SecurityAudit;
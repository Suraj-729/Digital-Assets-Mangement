import React from "react";

const TechnologyAndInfrastructure = ({ showTech = false, showInfra = false }) => (
  <div className="tab-pane fade pt-3">
    {showTech && (
      <table className="table">
        <thead>
          <tr>
            <th>Front End</th>
            <th>Framework</th>
            <th>Database</th>
            <th>OS</th>
            <th>OS Version</th>
            <th>Source Code Repo URL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Java, Node JS</td>
            <td>...</td>
            <td>SQL Server, MongoDB</td>
            <td>Linux, Windows</td>
            <td>Version 1</td>
            <td><a href="#">https://seedtrace.gov.in/</a></td>
          </tr>
        </tbody>
      </table>
    )}

    {showInfra && (
      <table className="table">
        <thead>
          <tr>
            <th>Server Type</th>
            <th>Data Centre</th>
            <th>Deployment</th>
            <th>Location</th>
            <th>Git URL</th>
            <th>Application Server Private IP</th>
            <th>Database Server Private IP</th>
            <th>Date of VA</th>
            <th>VA Score</th>
            <th>VA Audit Report</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cloud</td>
            <td>NDC</td>
            <td>VM</td>
            <td>BBSR</td>
            <td><a href="#">https://github.com/githubtraining/hellogitworld</a></td>
            <td>10.172.31.20</td>
            <td>10.172.31.20</td>
            <td>2024-04-24</td>
            <td>96%</td>
            <td><a href="#"><i className="bi bi-file-earmark-pdf"></i></a></td>
          </tr>
        </tbody>
      </table>
    )}
  </div>
);

export default TechnologyAndInfrastructure;

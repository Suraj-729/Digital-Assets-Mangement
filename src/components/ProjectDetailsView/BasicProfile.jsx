import React from "react";

const BasicProfile = () => (
  <div className="tab-pane fade show active profile-overview">
    <div className="row">
      <div className="col-md-12">
        <div className="project-details">
          <div className="row mb-3">
            <div className="col-md-4 col-xxl-3"><p>Project Name: <b>Project</b></p></div>
            <div className="col-md-4 col-xxl-3"><p>PRISM ID: <b>#16458655</b></p></div>
            <div className="col-md-4 col-xxl-3"><p>Department Name: <b>Department</b></p></div>
            <div className="col-md-4 col-xxl-3"><p>URL: <b><a href="https://seedtrace.gov.in/" target="_blank" rel="noreferrer">https://seedtrace.gov.in/</a></b></p></div>
            <div className="col-md-4 col-xxl-3"><p>Public IP: <b>8.107.677.0</b></p></div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h5>Nodal Officer from NIC:</h5>
              <div className="nodal_officer_data">
                <p>Name: <b>Name Goes here</b></p>
                <p>Emp Code: <b>#245613</b></p>
                <p>Mob: <b>1234 546 133</b></p>
                <p>Email: <b>example@gmail.com</b></p>
              </div>
            </div>
            <div className="col-md-6">
              <h5>Nodal Officer from Department:</h5>
              <div className="nodal_officer_data">
                <p>Name: <b>Name Goes here</b></p>
                <p>Emp Code: <b>#245613</b></p>
                <p>Mob: <b>1234 546 133</b></p>
                <p>Email: <b>example@gmail.com</b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BasicProfile;
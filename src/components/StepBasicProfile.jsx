import React from "react";
import "../css/mvpStyle.css";
// import axios from "axios";

const StepBasicProfile = ({ formData = {}, onChange, onNext }) => {
  // const handleNext=async () => {
  //   const payload = {
  //     BP: {
  //       name: formData.projectName,
  //       prismid: formData.prismId,
  //       deptname: formData.departmentName,
  //       url: formData.url,
  //       public_ip: formData.publicIp,
  //       nodalofficerNIC: {
  //         Name: formData.nicOfficerName,
  //         Emp_code: formData.nicOfficerEmpCode,
  //         Mob: formData.nicOfficerMob,
  //         Email: formData.nicOfficerEmail,
  //       },
  //       nodalofficerDept: {
  //         Name: formData.deptOfficerName,
  //         Designation: formData.deptOfficerDesignation,
  //         Mob: formData.deptOfficerMob,
  //         Email: formData.deptOfficerEmail,
  //       },
  //     }
  //   };

  //   try {
  //     const res = await axios.post("http://localhost:5000/assets/createAsset", payload);
  //     console.log("Asset Created:", res.data);
  //     onNext(); // go to next step
  //   } catch (err) {
  //     console.error("Error submitting asset:", err);
  //   }
  //   onNext();
  // };

  return (

  <fieldset>
    {/* <h3>Basic Profile</h3> */}
    <div className="form-section">
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Project Name:</label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="projectName"
                value={formData.projectName || ""}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row align-items-center text-right">
            <div className="col-sm-4 text-center">
              <label className="form-label">PRISM ID:</label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="prismId"
                value={formData.prismId || ""}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="row align-items-center text-right">
            <div className="col-sm-4 text-center">
              <label className="form-label">Department Name:</label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="departmentName"
                value={formData.departmentName || ""}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row align-items-center text-right">
            <div className="col-sm-4 text-center">
              <label className="form-label">URL:</label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="url"
                value={formData.url || ""}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="row align-items-center text-right">
            <div className="col-sm-4 text-center">
              <label className="form-label">Public IP:</label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="publicIp"
                value={formData.publicIp || ""}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
         <div className="col-md-6">
          <div className="row align-items-center text-right">
            <div className="col-sm-4 text-center">
              <label className="form-label">HOD</label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="HOD"
                value={formData.HOD || ""}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h5 className="sub-heading-1">Nodal Officer from NIC:</h5>
          <div className="p-3 border rounded box-1">
            <div className="row align-items-center text-right">
              <div className="col-sm-4 mb-2">
                <label className="form-label">Name:</label>
              </div>
              <div className="col-sm-8 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="nicOfficerName"
                  value={formData.nicOfficerName || ""}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row align-items-center text-right">
              <div className="col-sm-4 mb-2">
                <label className="form-label">Emp Code:</label>
              </div>
              <div className="col-sm-8 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="nicOfficerEmpCode"
                  value={formData.nicOfficerEmpCode || ""}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row align-items-center text-right">
              <div className="col-sm-4 mb-2">
                <label className="form-label">Mob:</label>
              </div>
              <div className="col-sm-8 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="nicOfficerMob"
                  value={formData.nicOfficerMob || ""}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row align-items-center text-right">
              <div className="col-sm-4 mb-2">
                <label className="form-label">Email:</label>
              </div>
              <div className="col-sm-8 mb-2">
                <input
                  type="email"
                  className="form-control"
                  name="nicOfficerEmail"
                  value={formData.nicOfficerEmail || ""}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h5 className="sub-heading-1">Nodal Officer from Department:</h5>
          <div className="p-3 border rounded box-1">
            <div className="row align-items-center text-right">
              <div className="col-sm-4 mb-2">
                <label className="form-label">Name:</label>
              </div>
              <div className="col-sm-8 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="deptOfficerName"
                  value={formData.deptOfficerName || ""}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row align-items-center text-right">
              <div className="col-sm-4 mb-2">
                <label className="form-label">Designation:</label>
              </div>
              <div className="col-sm-8 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="deptOfficerDesignation"
                  value={formData.deptOfficerDesignation || ""}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row align-items-center text-right">
              <div className="col-sm-4 mb-2">
                <label className="form-label">Mob:</label>
              </div>
              <div className="col-sm-8 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="deptOfficerMob"
                  value={formData.deptOfficerMob || ""}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row align-items-center text-right">
              <div className="col-sm-4 mb-2">
                <label className="form-label">Email:</label>
              </div>
              <div className="col-sm-8 mb-2">
                <input
                  type="email"
                  className="form-control"
                  name="deptOfficerEmail"
                  value={formData.deptOfficerEmail || ""}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <input
      type="button"
      name="next"
      className="next action-button btn btn-success"
      value="Next"
      onClick={onNext}
      // onClick={handleNext}
    />
  </fieldset>
);
  };

export default StepBasicProfile;
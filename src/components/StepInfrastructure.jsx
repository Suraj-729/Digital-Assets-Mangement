import React from "react";
import { Link } from "react-router-dom";
import "../css/mvpStyle.css";

const StepInfrastructure = ({
  formData = {},
  onChange,
  onAddGitUrl,
  onDeleteGitUrl,
  gitUrls = [],
  onAddVa,
  vaRecords = [],
  onVaFileChange,
  onDeleteVa,
  onPrevious,
  onSubmit,
}) => (
  <fieldset>
    <div className="form-section">
      {/* Server Info Row */}
      <div className="row g-3">
        <div className="col-md-4">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Type of Server:</label>
            </div>
            <div className="col-sm-8">
              <select
                className="form-select"
                name="typeOfServer"  // Changed to match backend
                value={formData.typeOfServer || "Cloud"}
                onChange={onChange}
              >
                <option value="Cloud">Cloud</option>
                <option value="Co-location">Co-location</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Data Centre:</label>
            </div>
            <div className="col-sm-8">
              <select
                className="form-select"
                name="dataCentre"
                value={formData.dataCentre || "NDC"}
                onChange={onChange}
              >
                <option value="NDC">NDC</option>
                <option value="SDC">SDC</option>
                <option value="GCP">GCP</option>
                <option value="Azure">Azure</option>
                <option value="AWS">AWS</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Deployment:</label>
            </div>
            <div className="col-sm-8">
              <select
                className="form-select"
                name="deployment"
                value={formData.deployment || "VM"}
                onChange={onChange}
              >
                <option value="VM">VM</option>
                <option value="Container as Service">Container as Service</option>
                <option value="K8S as Service">K8S as Service</option>
                <option value="Physical Machine">Physical Machine</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Location and Git URL */}
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Location:</label>
            </div>
            <div className="col-sm-8">
              <select
                className="form-select"
                name="location"
                value={formData.location || "BBSR"}
                onChange={onChange}
              >
                <option value="BBSR">BBSR</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-sm-2 text-center">
              <label className="form-label">Git URL:</label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="gitUrl"
                placeholder="Enter Git URL"
                value={formData.gitUrl || ""}
                onChange={onChange}
              />
              <div className="mt-2">
                {gitUrls.map((url, idx) => (
                  <div key={idx}>
                    {url}{" "}
                    <Link
                      className="text-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        onDeleteGitUrl(idx);
                      }}
                    >
                      Delete
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-2">
              <button 
                className="btn btn-primary w-100" 
                type="button" 
                onClick={onAddGitUrl}
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VA Details */}
      <div className="row mt-4 g-3">
        <div className="col-md-4">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">IP Address:</label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="ipAddress"  // Changed to match backend
                value={formData.ipAddress || ""}
                onChange={onChange}
                placeholder="Application server IP"
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Purpose of Use:</label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="purposeOfUse"  // Changed to match backend
                value={formData.purposeOfUse || "Application Server"}
                onChange={onChange}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Date of VA:</label>
            </div>
            <div className="col-sm-8">
              <input
                type="date"
                className="form-control"
                name="dateOfVA"  // Changed to match backend
                value={formData.dateOfVA || ""}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">VA Score:</label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="vaScore"
                value={formData.vaScore || ""}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Upload VA Report:</label>
            </div>
            <div className="col-sm-8">
              <input
                type="file"
                className="form-control"
                name="vaReport"
                onChange={onVaFileChange}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <button 
            className="btn btn-primary w-100" 
            type="button" 
            onClick={onAddVa}
          >
            ADD
          </button>
        </div>
      </div>
    </div>

   {/* VA Records Table */}
<div className="table-responsive mt-4">
  <table className="table table-bordered align-middle">
    <thead className="table-light">
      <tr>
        <th>S.No.</th>
        <th>IP Address</th>
        <th>Purpose of Use</th>
        <th>VA Score</th>
        <th>Date of VA</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {vaRecords && vaRecords.length > 0 ? (
        vaRecords.map((record, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{record.ipAddress || 'N/A'}</td>
            <td>{record.purposeOfUse || 'Application Server'}</td>
            <td>{record.vaScore || 'N/A'}</td>
            <td>
              {record.dateOfVA ? 
                new Date(record.dateOfVA).toLocaleDateString() : 
                'N/A'
              }
            </td>
            <td>
              <button
                className="icon-btn text-danger"
                style={{ border: "none", background: "none" }}
                title="Delete"
                type="button"
                onClick={() => onDeleteVa(idx)}
              >
                <i className="bi bi-trash"></i>
              </button>
              {record.vaReport && (
                <a 
                  href={`/va-reports/${record.vaReport}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-2"
                >
                  <i className="fa-regular fa-file-pdf"></i>
                </a>
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6} className="text-center">
            No records found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    <input
      type="button"
      name="previous"
      className="previous action-button-previous btn btn-primary"
      value="Previous"
      onClick={onPrevious}
    />
    <input
      type="submit"
      name="submit"
      className="submit action-button btn btn-primary"
      value="Submit"
      onClick={onSubmit}
    />
  </fieldset>
);

export default StepInfrastructure;
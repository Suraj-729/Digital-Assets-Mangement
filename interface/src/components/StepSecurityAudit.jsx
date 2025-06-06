import React from "react";

const StepSecurityAudit = ({
  formData = {},
  onChange,
  onFileChange,
  onAddRecord,
  auditRecords = [],
  onView,
  onDelete,
  onNext,
  onPrevious,
}) => (
  <fieldset>
    {/* <h3>Security</h3> */}
    <div className="form-section">
      <div className="row g-3">
        <div className="col-md-6">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Audit Date</label>
            </div>
            <div className="col-sm-8">
              <input
                type="date"
                className="form-control"
                name="auditDate"
                value={formData.auditDate || ""}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Expire Date:</label>
            </div>
            <div className="col-sm-8">
              <input
                type="date"
                className="form-control"
                name="expireDate"
                value={formData.expireDate || ""}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Type of Audit:</label>
            </div>
            <div className="col-sm-8">
              <select
                className="form-select"
                name="auditType"
                value={formData.auditType || "Internal"}
                onChange={onChange}
              >
                <option value="Internal">Internal</option>
                <option value="Third party">Third party</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Agency:</label>
            </div>
            <div className="col-sm-8">
              <select
                className="form-select"
                name="agency"
                value={formData.agency || "Agency 1"}
                onChange={onChange}
              >
                <option value="Agency 1">Agency 1</option>
                <option value="Agency 2">Agency 2</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Upload Security Audit Certificate:</label>
            </div>
            <div className="col-sm-8">
              <input
                type="file"
                className="form-control"
                name="certificate"
                onChange={onFileChange}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">SSL Lab Score:</label>
            </div>
            <div className="col-sm-8">
              <select
                className="form-select"
                name="sslLabScore"
                value={formData.sslLabScore || "A+"}
                onChange={onChange}
              >
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row align-items-center">
            <div className="col-sm-4 text-center">
              <label className="form-label">Next Expire Date:</label>
            </div>
            <div className="col-sm-8">
              <input
                type="date"
                className="form-control"
                name="nextExpireDate"
                value={formData.nextExpireDate || ""}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <button className="btn btn-primary" type="button" onClick={onAddRecord}>
          ADD RECORD
        </button>
      </div>
    </div>

    <div className="table-responsive mt-4">
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>S.No.</th>
            <th>Type</th>
            <th>Agency</th>
            <th>Date of Audit</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {auditRecords && auditRecords.length > 0 ? (
            auditRecords.map((record, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{record.auditType}</td>
                <td>{record.agency}</td>
                <td>{record.auditDate}</td>
                <td>
                  <button
                    className="icon-btn text-primary"
                    style={{ border: "none", background: "none" }}
                    title="View"
                    type="button"
                    onClick={() => onView(idx)}
                  >
                    <i className="fa-regular fa-file-lines"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="icon-btn text-danger"
                    style={{ border: "none", background: "none" }}
                    title="Delete"
                    type="button"
                    onClick={() => onDelete(idx)}
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
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
      type="button"
      name="next"
      className="next action-button btn btn-success"
      value="Next"
      onClick={onNext}
    />
  </fieldset>
);

export default StepSecurityAudit;
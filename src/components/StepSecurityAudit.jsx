import React from "react";
import "../css/mvpStyle.css";

const StepSecurityAudit = ({
  formData,
  onChange,
  auditRecords,
  setAuditRecords,
  onNext,
  onPrevious,
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onChange({ target: { name: "certificate", value: file, files: [file] } });
  };
  const handleAddRecord = () => {
    const newRecord = {
      auditDate: formData.auditDate,
      expireDate: formData.expireDate,
      nextExpireDate: formData.nextExpireDate,
      typeOfAudit: formData.auditType, // Changed to match backend
      auditingAgency: formData.agency, // Changed to match backend
      sslLabScore: formData.sslLabScore,
      certificate: formData.certificate?.name || "Uploaded",
    };

    setAuditRecords([...auditRecords, newRecord]);

    // Clear form fields
    onChange({ target: { name: "auditDate", value: "" } });
    onChange({ target: { name: "expireDate", value: "" } });
    onChange({ target: { name: "nextExpireDate", value: "" } });
    onChange({ target: { name: "auditType", value: "" } });
    onChange({ target: { name: "agency", value: "" } });
    onChange({ target: { name: "sslLabScore", value: "" } });
  };
  const handleView = (index) => {
    alert("Certificate: " + auditRecords[index].certificate);
  };

  const handleDelete = (index) => {
    const updated = [...auditRecords];
    updated.splice(index, 1);
    setAuditRecords(updated);
  };

  return (
    <fieldset>
      <div className="form-section">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Audit Date</label>
            <input
              type="date"
              className="form-control"
              name="auditDate"
              value={formData.auditDate || ""}
              onChange={onChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Expire Date</label>
            <input
              type="date"
              className="form-control"
              name="expireDate"
              value={formData.expireDate || ""}
              onChange={onChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Type of Audit</label>
            <select
              className="form-select"
              name="auditType"
              value={formData.typeOfAudit || ""}
              onChange={onChange}
            >
              <option value="">Select</option>
              <option value="Internal">Internal</option>
              <option value="Third party">Third party</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Agency</label>
            <select
              className="form-select"
              name="agency"
              value={formData.agency || ""}
              onChange={onChange}
            >
              <option value="">Select</option>
              <option value="Agency 1">Agency 1</option>
              <option value="Agency 2">Agency 2</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Upload Certificate</label>
            <input
              type="file"
              className="form-control"
              name="certificate"
              onChange={handleFileChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">SSL Lab Score</label>
            <select
              className="form-select"
              name="sslLabScore"
              value={formData.sslLabScore || ""}
              onChange={onChange}
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Next Expire Date</label>
            <input
              type="date"
              className="form-control"
              name="nextExpireDate"
              value={formData.nextExpireDate || ""}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAddRecord}
          >
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
            {auditRecords.length > 0 ? (
              auditRecords.map((record, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{record.typeOfAudit}</td> {/* Updated */}
                  <td>{record.auditingAgency}</td> {/* Updated */}
                  <td>{record.auditDate}</td>
                  <td>
                    <button
                      className="icon-btn text-primary"
                      onClick={() => handleView(idx)}
                    >
                      <i className="fa-regular fa-file-lines"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="icon-btn text-danger"
                      onClick={() => handleDelete(idx)}
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
        className="previous action-button-previous btn btn-primary"
        value="Previous"
        onClick={onPrevious}
      />
      <input
        type="button"
        className="next action-button btn btn-success"
        value="Next"
        onClick={onNext}
      />
    </fieldset>
  );
};

export default StepSecurityAudit;

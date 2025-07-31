import React from "react";
import "../css/mvpStyle.css";
import { FaTrash } from "react-icons/fa";

const DRForm = ({
  formData,
  setFormData,
  gitUrls,
  setGitUrls,
  records,
  setRecords,
  onPrevious,
  onSubmit, // ✅ renamed from handleSubmit
}) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAddGitUrl = () => {
    if (formData.gitUrlInput?.trim()) {
      setGitUrls([...gitUrls, formData.gitUrlInput.trim()]);
      setFormData((prev) => ({ ...prev, gitUrlInput: "" }));
    }
  };

  const handleDeleteGitUrl = (index) => {
    const updated = [...gitUrls];
    updated.splice(index, 1);
    setGitUrls(updated);
  };

  const handleAddRecord = () => {
    const newRecord = {
      ipAddress: formData.ipAddress,
      dbServerIp: formData.dbServerIp,
      purposeOfUse: formData.purpose, // <-- input field is 'purpose', but store as 'purposeOfUse'
      vaScore: formData.vaScore,
      vaDate: formData.vaDate,
      vaReport: formData.vaReport,
    };

    setRecords([...records, newRecord]);

    setFormData((prev) => ({
      ...prev,
      ipAddress: "",
      dbServerIp: "",
      purpose: "",
      vaScore: "",
      vaDate: "",
      vaReport: null,
    }));
  };

  const handleDeleteRecord = (index) => {
    const updated = [...records];
    updated.splice(index, 1);
    setRecords(updated);
  };

  return (
    <div className="container p-4" style={{ backgroundColor: "#f5f8ff" }}>
      <h3 className="mb-4">DR Information</h3>

      <div className="row mb-3">
        <div className="col-md-4">
          <label>Type of Server:</label>
          <select
            className="form-control"
            name="serverType"
            value={formData.serverType}
            onChange={handleChange}
          >
            <option value="Cloud">Cloud</option>
            <option value="On-Prem">On-Prem</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="col-md-4">
          <label>Data Centre:</label>
          <select
            className="form-control"
            name="dataCentre"
            value={formData.dataCentre}
            onChange={handleChange}
          >
            <option value="NDC">NDC</option>
            <option value="CDC">CDC</option>
            <option value="WDC">WDC</option>
          </select>
        </div>

        <div className="col-md-4">
          <label>Deployment:</label>
          <select
            className="form-control"
            name="deployment"
            value={formData.deployment}
            onChange={handleChange}
          >
            <option value="Container as Service">Container as Service</option>
            <option value="VM">VM</option>
            <option value="Cloud-native">Cloud-native</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <label>Location:</label>
          <select
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
          >
            <option value="BBSR">BBSR</option>
            <option value="BLR">BLR</option>
            <option value="DEL">DEL</option>
          </select>
        </div>

        <div className="col-md-6">
          <label>Git URL:</label>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              name="gitUrlInput"
              value={formData.gitUrlInput || ""}
              onChange={handleChange}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleAddGitUrl}
            >
              Add
            </button>
          </div>
          {gitUrls.map((url, index) => (
            <div key={index} className="mt-1">
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>{" "}
              <button
                className="btn btn-link text-danger p-0"
                onClick={() => handleDeleteGitUrl(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <label>IP Address:</label>
          <input
            type="text"
            className="form-control"
            name="ipAddress"
            value={formData.ipAddress}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>Database Server IP:</label>
          <input
            type="text"
            className="form-control"
            name="dbServerIp"
            value={formData.dbServerIp || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>Date of VA:</label>
          <input
            type="date"
            className="form-control"
            name="vaDate"
            value={formData.vaDate || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <label>VA Score:</label>
          <input
            type="text"
            className="form-control"
            name="vaScore"
            value={formData.vaScore}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>Upload VA Report:</label>
          <input
            type="file"
            className="form-control"
            name="vaReport"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4 d-flex align-items-end">
          <button
            type="button"
            onClick={handleAddRecord}
            className="btn btn-info w-100"
          >
            Add Record
          </button>
        </div>
      </div>

      {/* Records Table */}
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
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{record.ipAddress}</td>
                <td>{record.dbServerIp}</td>
                <td>{record.purposeOfUse}</td> {/* <-- use purposeOfUse */}
                <td>{record.vaScore}</td>
                <td>{record.vaDate}</td>
                <td>
                  {record.vaReport ? (
                    <a
                      href={URL.createObjectURL(record.vaReport)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    "No File"
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDeleteRecord(index)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No records added yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between mt-4">
        <button type="button" className="btn btn-secondary" onClick={onPrevious}>
          Previous
        </button>
        <button type="button" className="btn btn-success" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default DRForm;

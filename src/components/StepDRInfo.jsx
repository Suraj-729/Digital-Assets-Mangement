import React, { useState, useEffect } from "react";
import "../css/mvpStyle.css";
import { FaTrash } from "react-icons/fa";

const DRForm = ({
  formData,
  setFormData,
  records = [],
  setRecords,
  onPrevious,
  onSubmit,
}) => {
  const [vaForm, setVaForm] = useState({
    ipAddress: "",
    dbServerIp: "",
    purpose: "",
    vaScore: "",
    dateOfVA: "",
    vaReport: null,
  });

  // 🧠 Sync records from parent if editing
  useEffect(() => {
    if (formData?.vaRecords?.length) {
      setRecords(formData.vaRecords);
    }
  }, [formData, setRecords]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVaFormChange = (e) => {
    const { name, value, files } = e.target;
    setVaForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAddRecord = () => {
    if (!vaForm.ipAddress || !vaForm.dbServerIp) return;

    const newRecords = [...records, vaForm];
    setRecords(newRecords);
    setFormData((prev) => ({
      ...prev,
      vaRecords: newRecords,
    }));

    setVaForm({
      ipAddress: "",
      dbServerIp: "",
      purpose: "",
      vaScore: "",
      dateOfVA: "",
      vaReport: null,
    });
  };

  const handleDeleteRecord = (index) => {
    const updated = records.filter((_, i) => i !== index);
    setRecords(updated);
    setFormData((prev) => ({
      ...prev,
      vaRecords: updated,
    }));
  };

  return (
    <div className="container p-4" style={{ backgroundColor: "#f5f8ff" }}>
      <h3 className="mb-4">DR Information</h3>

      {/* DR Fields */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label>Type of Server:</label>
          <select
            className="form-control"
            name="serverType"
            value={formData.serverType || ""}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
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
            value={formData.dataCentre || ""}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
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
            value={formData.deployment || ""}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
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
            value={formData.location || ""}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            <option value="BBSR">BBSR</option>
            <option value="BLR">BLR</option>
            <option value="DEL">DEL</option>
          </select>
        </div>
        <div className="col-md-4">
            <label className="form-label">ANTIVIRUS:</label>
            <select
              className="form-select"
              name="antivirus"
              value={formData.antivirus || ""}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
      </div>

      <hr />
      <h4>VA Records</h4>

      <div className="row mb-3">
        <div className="col-md-4">
          <label>IP Address:</label>
          <input
            type="text"
            className="form-control"
            name="ipAddress"
            value={vaForm.ipAddress}
            onChange={handleVaFormChange}
          />
        </div>
        {/* 
        <div className="col-md-4">
          <label>DB Server IP:</label>
          <input
            type="text"
            className="form-control"
            name="dbServerIp"
            value={vaForm.dbServerIp}
            onChange={handleVaFormChange}
          />
        </div> */}
        <div className="col-md-4">
          <label>DB Server IP:</label>
          <input
            type="text"
            className="form-control"
            name="dbServerIp"
            value={vaForm.dbServerIp}
            onChange={handleVaFormChange}
            pattern="^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$"
            title="Enter a valid IPv4 address (e.g., 192.168.1.1)"
            required
          />
        </div>


        <div className="col-md-4">
          <label>Purpose:</label>
          <input
            type="text"
            className="form-control"
            name="purpose"
            value={vaForm.purpose}
            onChange={handleVaFormChange}
          />
        </div>

        <div className="col-md-4 mt-3">
          <label>Date of VA:</label>
          <input
            type="date"
            className="form-control"
            name="dateOfVA"
            value={vaForm.dateOfVA}
            onChange={handleVaFormChange}
          />
        </div>

        <div className="col-md-4 mt-3">
          <label>VA Score:</label>
          <input
            type="text"
            className="form-control"
            name="vaScore"
            value={vaForm.vaScore}
            onChange={handleVaFormChange}
          />
        </div>

        <div className="col-md-4 mt-3">
          <label>Upload VA Report:</label>
          <input
            type="file"
            className="form-control"
            name="vaReport"
            onChange={handleVaFormChange}
          />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <button className="btn btn-info w-100" type="button" onClick={handleAddRecord}
            style={{

              color: "white",
              border: "none",
              padding: "8px 70px",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "14px",
              letterSpacing: "0.5px",
              marginLeft: "420px"
            }}>


            Add Record
          </button>
        </div>
      </div>

      {/* VA Table */}
      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>S.No.</th>
            <th>IP Address</th>
            <th>DB Server IP</th>
            <th>Purpose</th>
            <th>VA Score</th>
            <th>Date</th>
            <th>Report</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {records.length ? (
            records.map((rec, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{rec.ipAddress}</td>
                <td>{rec.dbServerIp}</td>
                <td>{rec.purpose}</td>
                <td>{rec.vaScore}</td>
                <td>{rec.dateOfVA}</td>
                <td>
                  {rec.vaReport ? (
                    typeof rec.vaReport === "string" ? (
                      <a href={rec.vaReport} target="_blank" rel="noreferrer">View</a>
                    ) : (
                      <a href={URL.createObjectURL(rec.vaReport)} target="_blank" rel="noreferrer">View</a>
                    )
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
              <td colSpan="8">No records added.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        {/* <button className="btn btn-secondary" onClick={onPrevious}> */}
        <button className="btn btn-secondary" onClick={onPrevious}
          style={{
            width: "100px",
            fontWeight: "bold",
            color: "white",
            border: "0 none",
            borderRadius: "10px",
            cursor: "pointer",
            padding: "10px 5px",
            background: "#a8dced",
            marginLeft: "470px"
          }}>

          Previous
        </button>
        {/* <button className="btn btn-success" onClick={onSubmit}> */}
        <button className="btn btn-success" onClick={onSubmit}
          style={{
            width: "100px",
            fontWeight: "bold",
            color: "white",
            border: "0 none",
            borderRadius: "10px",
            cursor: "pointer",
            padding: "10px 5px",
            background: "#0099cc",
            marginRight: "470px"
          }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default DRForm;

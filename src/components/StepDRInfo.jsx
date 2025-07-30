import React, { useState } from "react";
import "../css/mvpStyle.css";
import { FaTrash, FaEdit } from "react-icons/fa";

const DRForm = ({ onPrevious, handleSubmit }) => {
  const [formData, setFormData] = useState({
    serverType: "Cloud",
    dataCentre: "NDC",
    deployment: "Container as Service",
    location: "BBSR",
    gitUrlInput: "",
    ipAddress: "",
    purpose: "",
    vaDate: "",
    vaScore: "",
    dbServerIp: "",
    vaReport: null,
  });

  const [gitUrls, setGitUrls] = useState([]);
  const [records, setRecords] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAddGitUrl = () => {
    if (formData.gitUrlInput.trim()) {
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
    purpose: formData.purpose,
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
   <div className="container p-4" style={{ backgroundColor: '#f5f8ff' }}>

      <h3 className="mb-4">DR Information</h3>
      <div className="row mb-3">
        <div className="col-md-4">
         <label style={{ fontSize: "18px",textAlign: "left", display: "block" }}>Type of Server:</label>

          <select
            className="form-control"
            name="serverType"
            value={formData.serverType}
            onChange={handleChange}
          >
            <option value="Cloud">Select</option>
            <option value="Cloud">Cloud</option>
            <option value="On-Prem">On-Prem</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="col-md-4">
           <label style={{ fontSize: "18px",textAlign: "left", display: "block" }}>Data Centre:</label>
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
          
           <label style={{ fontSize: "18px",textAlign: "left", display: "block" }}>Deployment:</label>
          <select
            className="form-control"
            name="deployment"
            value={formData.deployment}
            onChange={handleChange}
          >
            <option>Container as Service</option>
            <option>VM</option>
            <option>Cloud-native</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <label style={{ fontSize: "18px",textAlign: "left", display: "block" }}>Location:</label>
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
          {/* <label>Git URL:</label> */}
          <div className="d-flex">
            
           
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
           <label style={{ fontSize: "18px",textAlign: "left", display: "block" }}>IP Address:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Application server IP"
            name="ipAddress"
            value={formData.ipAddress}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
           <label style={{ fontSize: "18px",textAlign: "left", display: "block" }}>Purpose of Use:</label>
          <input
  type="text"
  className="form-control"
  name="dbServerIp"   // ✅ Corrected
  value={formData.dbServerIp || ""}
  onChange={handleChange}
/>

        </div>

        <div className="col-md-4">
          <label style={{ fontSize: "18px",textAlign: "left", display: "block" }}>Date of VA:</label>
          <input
            type="date"
            className="form-control"
            name="vaDate"
            value={formData.vaDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
           <label style={{ fontSize: "18px",textAlign: "left", display: "block" }}>VA Score:</label>
          <input
            type="text"
            className="form-control"
            name="vaScore"
            value={formData.vaScore}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
       <label style={{ fontSize: "18px",textAlign: "left", display: "block" }}>Upload VA Report:</label>
          <input
            type="file"
            className="form-control"
            name="vaReport"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
           <label style={{ fontSize: "18px",textAlign: "left", display: "block" }}>Database Server IP:</label>
          <input
            type="text"
            className="form-control"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
          />
        </div>

        
        
   <div style={{ margin: "20px 0", display: "flex", justifyContent: "center" }}>
  <button
    type="button"
    onClick={handleAddRecord}
    style={{
      backgroundColor: "#03A9F4",
      color: "white",
      border: "none",
      padding: "8px 70px",
      borderRadius: "6px",
      fontWeight: "bold",
      fontSize: "14px",
      letterSpacing: "0.5px",
    }}
  >
    ADD
  </button>
</div>  
      </div>


      {/* Records Table */}
      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>S.No.</th>
            <th>IP Address</th>
            <th>Purpose of Use</th>
            <th>VA Score</th>
            <th>Date of VA</th>
            <th>Action</th>
            
            <th>VA Report</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
  {records.map((record, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{record.ipAddress}</td>
      <td>{record.dbServerIp}</td>
      <td>{record.purpose}</td>
      <td>{record.vaScore}</td>
      <td>{record.vaDate}</td>
      <td>
        {record.vaReport ? (
          <a
            href={URL.createObjectURL(record.vaReport)}
            target="_blank"
            rel="noopener noreferrer"
          >
            View PDF
          </a>
        ) : (
          "No file"
        )}
      </td>
      <td>
        <button
          className="btn btn-outline-danger btn-sm me-1"
          onClick={() => handleDeleteRecord(index)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  ))}
  {records.length === 0 && (
    <tr>
      <td colSpan="8">No records added yet.</td>
    </tr>
  )}
</tbody>

      </table>
       <div className="d-flex justify-content-between mt-4">
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={onPrevious}
        style={{
          width: "100px",
          fontWeight: "bold",
          color: "white",
          border: "0 none",
          borderRadius: "10px",
          cursor: "pointer",
          padding: "10px 5px",
          background: "#a8dced",
        }}
      >
        Previous
      </button>

      <button
        type="submit"
        className="btn btn-success"
        onClick={handleSubmit}
        style={{
          width: "100px",
          fontWeight: "bold",
          color: "white",
          border: "0 none",
          borderRadius: "10px",
          cursor: "pointer",
          padding: "10px 5px",
          background: "#0099cc",
        }}
      >
        Sumbit
      </button>
    </div>
  </div>
);
};


export default DRForm;

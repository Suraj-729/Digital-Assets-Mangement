import React, { useState } from "react";
import axios from "axios";
import "../css/mvpStyle.css";

const StepSecurityAudit = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    auditDate: "",
    expireDate: "",
    nextExpireDate: "",
    auditType: "",
    agency: "",
    sslLabScore: "",
    certificate: null,
  });

  const [auditRecords, setAuditRecords] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, certificate: file }));
  };

  const handleAddRecord = () => {
    const newRecord = {
      auditDate: formData.auditDate,
      expireDate: formData.expireDate,
      nextExpireDate: formData.nextExpireDate,
      auditType: formData.auditType,
      agency: formData.agency,
      sslLabScore: formData.sslLabScore,
      certificate: formData.certificate?.name || "Uploaded",
    };
    setAuditRecords([...auditRecords, newRecord]);
  };

  const handleView = (index) => {
    alert("Certificate: " + auditRecords[index].certificate);
  };

  const handleDelete = (index) => {
    const updated = [...auditRecords];
    updated.splice(index, 1);
    setAuditRecords(updated);
  };

  const handleNext = async () => {
    try {
      const formDataToSend = new FormData();
  
      const SA = {
        auditDate: formData.auditDate,
        expireDate: formData.expireDate,
        nextExpireDate: formData.nextExpireDate,
        typeofaudit: formData.auditType,
        auditingagency: formData.agency,
        sslLabScore: formData.sslLabScore,
        securityAudit: auditRecords.map((rec, index) => ({
          "Sl no": index + 1,
          Type: rec.auditType,
          Agency: rec.agency,
          auditDate: rec.auditDate,
        })),
      };
  
// ✅ Add a dummy or actual name field
// formDataToSend.append("name", "Sample Asset Name"); // 👈 Replace with actual value when integrating full form
formDataToSend.append("SA", JSON.stringify(SA));
      if (formData.certificate) {
        formDataToSend.append("certificate", formData.certificate);
      }
  
      await axios.post("http://localhost:5000/assets/createAsset", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert("Submitted successfully!");
      onNext();
    } catch (error) {
      console.error("Error submitting Security Audit section:", error);
      alert("Failed to submit. Check console for details.");
    }
    onNext();
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
              value={formData.auditDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Expire Date</label>
            <input
              type="date"
              className="form-control"
              name="expireDate"
              value={formData.expireDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Type of Audit</label>
            <select
              className="form-select"
              name="auditType"
              value={formData.auditType}
              onChange={handleChange}
            >
              <option value="Internal">Internal</option>
              <option value="Third party">Third party</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Agency</label>
            <select
              className="form-select"
              name="agency"
              value={formData.agency}
              onChange={handleChange}
            >
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
              value={formData.sslLabScore}
              onChange={handleChange}
            >
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
              value={formData.nextExpireDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-4 text-center">
          <button className="btn btn-primary" type="button" onClick={handleAddRecord}>
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
                  <td>{record.auditType}</td>
                  <td>{record.agency}</td>
                  <td>{record.auditDate}</td>
                  <td>
                    <button className="icon-btn text-primary" onClick={() => handleView(idx)}>
                      <i className="fa-regular fa-file-lines"></i>
                    </button>
                  </td>
                  <td>
                    <button className="icon-btn text-danger" onClick={() => handleDelete(idx)}>
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
        onClick={handleNext}
      />
    </fieldset>
  );
};

export default StepSecurityAudit;
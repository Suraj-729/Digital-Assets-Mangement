

import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

const StepTLSInfo = ({ onPrevious, onNext, tlsData, setTlsData }) => {
  const [tlsIssueDate, setTlsIssueDate] = useState("");
  const [tlsNextExpiry, setTlsExpiryDate] = useState("");
  const [tlsScore, setTlsScore] = useState("");
  const [tlsProcuredFrom, setTlsProcuredFrom] = useState("");

  // ✅ Pre-fill form if editing an existing record (first one as default)
  useEffect(() => {
    if (tlsData?.length > 0) {
      const first = tlsData[0];
      setTlsIssueDate(first.issueDate?.slice(0, 10) || "");
      setTlsExpiryDate(first.expiryDate?.slice(0, 10) || "");
      setTlsScore(first.score || "");
      setTlsProcuredFrom(first.procuredFrom || "");
    }
  }, [tlsData]);

  const handleAddRecord = () => {
    if (!tlsIssueDate || !setTlsExpiryDate || !tlsScore || !tlsProcuredFrom) {
      alert("Please fill all fields");
      return;
    }

    const newRecord = {
      issueDate: tlsIssueDate,
      expiryDate: tlsNextExpiry,
      score: tlsScore,
      procuredFrom: tlsProcuredFrom,
    };

    setTlsData([...tlsData, newRecord]);

    // Reset form
    setTlsIssueDate("");
    setTlsExpiryDate("");
    setTlsScore("");
    setTlsProcuredFrom("");
  };

  return (
    <div className="container mt-4">
      {/* <h3 className="text-center mb-4">TLS Information</h3> */}

  {/* First Row */}
  <div className="row mb-3 align-items-center">
    <div className="col-md-2 text-end ">Certificate Issue Date:</div>
    <div className="col-md-4">
      <input
        type="date"
        className="form-control"
        value={tlsIssueDate}
        onChange={(e) => setTlsIssueDate(e.target.value)}
        
      />
    </div>
    <div className="col-md-2 text-end ">TLS Expiry Date:</div>
    <div className="col-md-4">
      <input
        type="date"
        className="form-control"
        value={tlsNextExpiry}
        onChange={(e) => setTlsExpiryDate(e.target.value)}
      />
    </div>
  </div>

      {/* Second Row */}
      <div className="row mb-3 align-items-center">
        <div className="col-md-2 text-end">TLS Lab Score:</div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={tlsScore}
            onChange={(e) => setTlsScore(e.target.value)}
          >
            <option value="">Select Score</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>

        <div className="col-md-2 text-end">Certificate Procured From:</div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            value={tlsProcuredFrom}
            onChange={(e) => setTlsProcuredFrom(e.target.value)}
            placeholder="Enter source name"
          />
        </div>
      </div>

      {/* Add Button */}
      <div className="text-center mb-4">
        <button
          type="button"
          className="btn btn-primary"
          style={{ backgroundColor: "#0099cc", color: "white", border: "none" }}
          onClick={handleAddRecord}
        >
          ADD RECORD
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>S.No.</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
              <th>Score</th>
              <th>Certificate Procured From</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tlsData?.map((record, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{record.issueDate?.slice(0, 10)}</td>
                <td>{record.expiryDate?.slice(0, 10)}</td>
                <td>{record.score}</td>
                <td>{record.procuredFrom}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      const updatedData = [...tlsData];
                      updatedData.splice(index, 1);
                      setTlsData(updatedData);
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "30px",
        }}
      >
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
            padding: "10px 5px",
            background: "#a8dced",
          }}
        >
          Previous
        </button>

        <button
          type="button"
          className="btn btn-success"
          onClick={onNext}
          style={{
            width: "100px",
            fontWeight: "bold",
            color: "white",
            border: "0 none",
            borderRadius: "10px",
            padding: "10px 5px",
            background: "#0099cc",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTLSInfo;


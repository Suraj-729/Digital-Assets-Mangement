import React, { useState } from "react";
import axios from "axios";
import "../css/mvpStyle.css";

const StepTechnologyStack = ({
  formData = {},
  onChange,
  onNext,
  onPrevious,
  updateFormData, // new prop to update the full formData with TS section
}) => {
  const [usedTech, setUsedTech] = useState([]);
  const [usedDb, setUsedDb] = useState([]);
  const [usedOs, setUsedOs] = useState([]);
  const [usedOsVersion, setUsedOsVersion] = useState([]);
  const [usedRepo, setUsedRepo] = useState([]);

  const addToList = (value, list, setter) => {
    if (value && !list.includes(value)) {
      setter([...list, value]);
    }
  };

  const handleAddRepo = () => {
    const repoUrl = formData.repoUrl?.trim();
    if (repoUrl) {
      addToList(repoUrl, usedRepo, setUsedRepo);
    }
  };

  const handleNext = async () => {
    try {
      const TS = {
        frontEnd: usedTech,
        framework: formData.framework,
        database: usedDb,
        os: usedOs,
        osVersion: usedOsVersion,
        repoUrls: usedRepo,
      };
  
      // Create FormData for multipart/form-data submission
      const formDataToSend = new FormData();
  
      // Append TS section as stringified JSON
      formDataToSend.append("TS", JSON.stringify(TS));
  
      // 🔒 If certificate upload is involved, also do:
      // formDataToSend.append("certificate", formData.certificate); // if you have it
  
      console.log("Sending TS to backend:", TS); // Debug log
  
      await axios.post("http://localhost:5000/assets/createAsset", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert("Technology Stack submitted successfully!");
      onNext();
    } catch (error) {
      console.error("Error submitting tech stack:", error);
      alert("Submission failed. See console.");
    }
    onNext();
  };
  

  return (
    <fieldset>
      <div className="form-section">

        {/* Front End */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-center">Front End:</label>
          <div className="col-md-3">
            <select className="form-select" name="frontEnd" value={formData.frontEnd || "Java"} onChange={onChange}>
              <option value="Java">Java</option>
              <option value=".Net 4.5 & below">.Net 4.5 & below</option>
              <option value=".Net Core">.Net Core</option>
              <option value="Node JS">Node JS</option>
              <option value="PHP">PHP</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="button" onClick={() => addToList(formData.frontEnd, usedTech, setUsedTech)}>
              ADD
            </button>
          </div>
          <div className="col-md-5 text-center">
            <span className="info-label">Technology used: - {usedTech.join(", ")}</span>
          </div>
        </div>

        {/* Framework */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-center">Framework:</label>
          <div className="col-md-5">
            <input type="text" className="form-control" name="framework" placeholder="If multiple, comma-separated" value={formData.framework || ""} onChange={onChange} />
          </div>
        </div>

        {/* Database */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-center">Database:</label>
          <div className="col-md-3">
            <select className="form-select" name="database" value={formData.database || "MongoDB"} onChange={onChange}>
              <option value="MongoDB">MongoDB</option>
              <option value="SQL Server">SQL Server</option>
              <option value="Redis">Redis</option>
              <option value="Post-gre SQL">Post-gre SQL</option>
              <option value="Cassandra">Cassandra</option>
              <option value="MySQL">MySQL</option>
              <option value="Oracle">Oracle</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="button" onClick={() => addToList(formData.database, usedDb, setUsedDb)}>
              ADD
            </button>
          </div>
          <div className="col-md-5 text-center">
            <span className="info-label">Databases used: - {usedDb.join(", ")}</span>
          </div>
        </div>

        {/* OS */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-center">OS:</label>
          <div className="col-md-3">
            <select className="form-select" name="os" value={formData.os || "Linux"} onChange={onChange}>
              <option value="Linux">Linux</option>
              <option value="Windows">Windows</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="button" onClick={() => addToList(formData.os, usedOs, setUsedOs)}>
              ADD
            </button>
          </div>
          <div className="col-md-5 text-center">
            <span className="info-label">OS used: - {usedOs.join(", ")}</span>
          </div>
        </div>

        {/* OS Version */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-center">OS Version:</label>
          <div className="col-md-3">
            <select className="form-select" name="osVersion" value={formData.osVersion || "Version 1"} onChange={onChange}>
              <option value="Version 1">Version 1</option>
              <option value="Version 2">Version 2</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="button" onClick={() => addToList(formData.osVersion, usedOsVersion, setUsedOsVersion)}>
              ADD
            </button>
          </div>
          <div className="col-md-5 text-center">
            <span className="info-label">OS Versions: - {usedOsVersion.join(", ")}</span>
          </div>
        </div>

        {/* Repo URL */}
        <div className="row mb-3 align-items-center">
          <label className="col-md-2 col-form-label text-center">Source Code Repo URL:</label>
          <div className="col-md-3">
            <input type="text" className="form-control" name="repoUrl" placeholder="Repo URL" value={formData.repoUrl || ""} onChange={onChange} />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="button" onClick={handleAddRepo}>
              ADD
            </button>
          </div>
          <div className="col-md-5 text-center">
            <span className="info-label">Repo URLs: - {usedRepo.join(", ")}</span>
          </div>
        </div>
      </div>

      <input type="button" className="previous action-button-previous btn btn-primary" value="Previous" onClick={onPrevious} />
      <input type="button" className="next action-button btn btn-success" value="Next" onClick={handleNext} />
    </fieldset>
  );
};

export default StepTechnologyStack;
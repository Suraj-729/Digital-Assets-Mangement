import React from "react";
import "../css/mvpStyle.css";
const StepTechnologyStack = ({
  formData = {},
  onChange,
  onAddTech,
  onAddDb,
  onAddOs,
  onAddOsVersion,
  onAddRepo,
  usedTech = [],
  usedDb = [],
  usedOs = [],
  usedOsVersion = [],
  usedRepo = [],
  onNext,
  onPrevious,
}) => (
  <fieldset>
    {/* <h3>Technology Stack</h3> */}
    <div className="form-section">
      {/* Front End */}
      <div className="row mb-3 align-items-center">
        <label className="col-md-2 col-form-label text-center">Front End:</label>
        <div className="col-md-3">
          <select
            className="form-select"
            name="frontEnd"
            value={formData.frontEnd || "Java"}
            onChange={onChange}
          >
            <option value="Java">Java</option>
            <option value=".Net 4.5 & below">.Net 4.5 & below</option>
            <option value=".Net Core">.Net Core</option>
            <option value="Node JS">Node JS</option>
            <option value="PHP">PHP</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="button" onClick={onAddTech}>
            ADD
          </button>
        </div>
        <div className="col-md-5 text-center">
          <span className="info-label">
            Technology used: - {usedTech.join(", ")}
          </span>
        </div>
      </div>

      {/* Framework */}
      <div className="row mb-3 align-items-center">
        <label className="col-md-2 col-form-label text-center">Framework:</label>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            name="framework"
            placeholder="If multiple FW then type comma separated"
            value={formData.framework || ""}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Database */}
      <div className="row mb-3 align-items-center">
        <label className="col-md-2 col-form-label text-center">Database:</label>
        <div className="col-md-3">
          <select
            className="form-select"
            name="database"
            value={formData.database || "MongoDB"}
            onChange={onChange}
          >
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
          <button className="btn btn-primary w-100" type="button" onClick={onAddDb}>
            ADD
          </button>
        </div>
        <div className="col-md-5 text-center">
          <span className="info-label">
            Databases used: - {usedDb.join(", ")}
          </span>
        </div>
      </div>

      {/* OS */}
      <div className="row mb-3 align-items-center">
        <label className="col-md-2 col-form-label text-center">OS:</label>
        <div className="col-md-3">
          <select
            className="form-select"
            name="os"
            value={formData.os || "Linux"}
            onChange={onChange}
          >
            <option value="Linux">Linux</option>
            <option value="Windows">Windows</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="button" onClick={onAddOs}>
            ADD
          </button>
        </div>
        <div className="col-md-5 text-center">
          <span className="info-label">
            OS used: - {usedOs.join(", ")}
          </span>
        </div>
      </div>

      {/* OS Version */}
      <div className="row mb-3 align-items-center">
        <label className="col-md-2 col-form-label text-center">OS Version:</label>
        <div className="col-md-3">
          <select
            className="form-select"
            name="osVersion"
            value={formData.osVersion || "Version 1"}
            onChange={onChange}
          >
            <option value="Version 1">Version 1</option>
            <option value="Version 2">Version 2</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="button" onClick={onAddOsVersion}>
            ADD
          </button>
        </div>
        <div className="col-md-5 text-center">
          <span className="info-label">
            OS Version: {usedOsVersion.join(", ")}
          </span>
        </div>
      </div>

      {/* Source Code Repo URL */}
      <div className="row mb-3 align-items-center">
        <label className="col-md-2 col-form-label text-center">Source Code Repo URL:</label>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            name="repoUrl"
            placeholder="Repo URL"
            value={formData.repoUrl || ""}
            onChange={onChange}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="button" onClick={onAddRepo}>
            ADD
          </button>
        </div>
        <div className="col-md-5 text-center">
          <span className="info-label">
            Repo URL: {usedRepo.join(", ")}
          </span>
        </div>
      </div>
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

export default StepTechnologyStack;
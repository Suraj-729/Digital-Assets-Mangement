import React, { useState, useEffect } from "react";
import "../css/mvpStyle.css";
import { toast } from "react-toastify";
import api from "../Api"
const StepTechnologyStack = ({
  formData = {},
  onChange,
  onNext,
  onPrevious,
  usedTech,
  setUsedTech,
  usedDb,
  setUsedDb,
  usedOs,
  setUsedOs,
  usedOsVersion,
  setUsedOsVersion,
  usedRepo,
  setUsedRepo,
  usedFrameworks, // ✅ Accept from props
  setUsedFrameworks,
}) => {
  const [errors, setErrors] = useState({});
  const [dbOptions, setDbOptions] = useState([]);
  const [osData, setOsData] = useState([]);
  const [filteredVersions, setFilteredVersions] = useState([]);
  const [frameworkData, setFrameworkData] = useState([]);
  const [filteredFrameworkVersions, setFilteredFrameworkVersions] = useState([]);
  const [frontendData, setFrontendData] = useState([]);
  // const [filteredVersions, setFilteredVersions] = useState([]);



  useEffect(() => {
    api.get("/getOs")
      .then((res) => setOsData(res.data))
      .catch((err) => console.error("Failed to load OS data", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/databases")
      .then((res) => res.json())
      .then((data) => setDbOptions(data || []))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch database list.");
      });
  }, []);
  useEffect(() => {
    if (formData.os) {
      const versions = osData
        .filter(item => item.os === formData.os)
        .map(item => item.version);
      setFilteredVersions(versions);
    } else {
      setFilteredVersions([]);
    }
  }, [formData.os, osData]);


  // Fetch framework data from backend

  // Filter versions when framework name changes
useEffect(() => {
    api.get("/frontend")
      .then((res) => setFrontendData(res.data))
      .catch((err) => console.error("Failed to fetch frontend tech", err));
  }, []);

  // Update filtered versions when a tech is selected
  useEffect(() => {
    if (formData.frontEnd) {
      const versions = frontendData
        .filter(item => item.technology === formData.frontEnd)
        .map(item => item.version);
      setFilteredVersions(versions);
    } else {
      setFilteredVersions([]);
    }
  }, [formData.frontEnd, frontendData]);

  // const [usedFrameworks, setUsedFrameworks] = useState([]);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const addToStack = (field, value, setter, inputField) => {
    if (!value?.trim()) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Please select or enter a value first",
      }));
      // toast.error("Please enter a value before adding.");
      return;
    }

    if (field === "repoUrl" && !isValidUrl(value)) {
      setErrors((prev) => ({ ...prev, repoUrl: "Please enter a valid URL" }));
      // toast.error("Invalid URL format.");
      return;
    }

    const stateMaps = {
      frontEnd: usedTech,
      framework: usedFrameworks,
      database: usedDb,
      os: usedOs,
      osVersion: usedOsVersion,
      repoUrl: usedRepo,
    };

    const currentArray = stateMaps[field];
    if (currentArray.includes(value)) {
      // toast.warn(`"${value}" already added to ${field.replace("Url", "")}.`);
      return;
    }

    setter((prev) => [...prev, value]);
    // toast.success(`"${value}" added to ${field.replace("Url", "")}.`);

    setErrors((prev) => ({ ...prev, [field]: "" }));
    onChange({ target: { name: inputField, value: "" } });
  };

  const removeFromStack = (field, value, setter) => {
    setter((prev) => prev.filter((item) => item !== value));
    // toast.info(`"${value}" removed from ${field.replace("Url", "")}.`);
  };

  const renderStackBadges = (items, field, setter) => {
    return items.map((item) => (
      <span key={item} className="badge bg-primary me-2 mb-2 p-2">
        {item}
        <button
          type="button"
          className="btn-close btn-close-white ms-2"
          onClick={() => removeFromStack(field, item, setter)}
          aria-label={`Remove ${item}`}
        />
      </span>
    ));
  };

  const handleAddRepository = () => {
    const repoUrl = formData.repoUrl?.trim();
    addToStack("repoUrl", repoUrl, setUsedRepo, "repoUrl");
  };

  const handleNextStep = () => {
    const errors = {};
    let isValid = true;

    if (usedTech.length === 0) {
      errors.frontEnd = "Please add at least one front-end technology";
      isValid = false;
    }

    if (usedFrameworks.length === 0) {
      errors.framework = "Please add at least one framework";
      isValid = false;
    }

    if (usedDb.length === 0) {
      errors.database = "Please add at least one database";
      isValid = false;
    }

    if (usedOs.length === 0) {
      errors.os = "Please add at least one operating system";
      isValid = false;
    }

    if (usedOsVersion.length === 0) {
      errors.osVersion = "Please add at least one OS version";
      isValid = false;
    }

    if (usedRepo.length === 0) {
      errors.repoUrl = "Please add at least one repository URL";
      isValid = false;
    }

    if (!isValid) {
      setErrors(errors);
      toast.error("Please complete all fields before proceeding.");
      return;
    }

    onNext();
  };

  const knownDatabases = [
    "MongoDB",
    "SQL Server",
    "Redis",
    "PostgreSQL",
    "Cassandra",
    "MySQL",
    "Oracle",
  ];

  return (
    <fieldset className="technology-stack-form">
      <legend className="form-legend">Technology Stack</legend>

      {/* Front End */}
       <div className="form-group row mb-4">
      <label className="col-md-3 col-form-label fw-bold">Front End Technology</label>
      <div className="col-md-6">
        {/* Technology Dropdown */}
        <div className="input-group mb-2">
          <select
            className={`form-select ${errors.frontEnd ? "is-invalid" : ""}`}
            name="frontEnd"
            value={formData.frontEnd || ""}
            onChange={onChange}
          >
            <option value="">Select a front-end technology</option>
            {[...new Set(frontendData.map(item => item.technology))].map((tech, idx) => (
              <option key={idx} value={tech}>{tech}</option>
            ))}
          </select>
        </div>

        {/* Version Dropdown */}
        {filteredVersions.length > 0 && (
          <div className="input-group mb-2">
            <select
              className={`form-select ${errors.frontEndVersion ? "is-invalid" : ""}`}
              name="frontEndVersion"
              value={formData.frontEndVersion || ""}
              onChange={onChange}
            >
              <option value="">Select a version</option>
              {filteredVersions.map((ver, idx) => (
                <option key={idx} value={ver}>{ver}</option>
              ))}
            </select>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() =>
                addToStack(
                  "frontEnd",
                  `${formData.frontEnd} ${formData.frontEndVersion}`,
                  setUsedTech,
                  "frontEnd"
                )
              }
              disabled={!formData.frontEnd || !formData.frontEndVersion}
            >
              Add
            </button>
          </div>
        )}

        {/* Validation */}
        {errors.frontEnd && <div className="invalid-feedback">{errors.frontEnd}</div>}
        {errors.frontEndVersion && <div className="invalid-feedback">{errors.frontEndVersion}</div>}

        {/* BADGES */}
        <div className="badge-container mt-2">
          {renderStackBadges(usedTech, "frontEnd", setUsedTech)}
        </div>
      </div>
    </div>

      {/* Framework */}
      <div className="form-group row mb-4">
        <label className="col-md-3 col-form-label">Framework(s)</label>
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className={`form-control ${errors.framework ? "is-invalid" : ""}`}
              name="framework"
              placeholder="Enter framework name"
              value={formData.framework || ""}
              onChange={onChange}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={() =>
                addToStack(
                  "framework",
                  formData.framework,
                  setUsedFrameworks,
                  "framework"
                )
              }
            >
              Add
            </button>
          </div>
          {errors.framework && (
            <div className="invalid-feedback">{errors.framework}</div>
          )}

          {/* BADGES IN ROW */}
          <div className="badge-container mt-2">
            {renderStackBadges(usedFrameworks, "framework", setUsedFrameworks)}
          </div>
        </div>
      </div>

      {/* Database */}

      <div className="form-group row mb-4">
        <label className="col-md-3 col-form-label">Database</label>
        <div className="col-md-6">
          <div className="input-group">
            <select
              className={`form-select ${errors.database ? "is-invalid" : ""}`}
              name="database"
              value={formData.database || ""}
              onChange={onChange}
            >
              <option value="">Select a database</option>
              {dbOptions.map((db, idx) => (
                <option key={idx} value={`${db.DB} ${db.Version}`}>
                  {db.DB} {db.Version}
                </option>
              ))}
              <option value="Other">OTHER</option>
            </select>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() =>
                addToStack(
                  "database",
                  formData.database === "Other"
                    ? formData.otherDatabase
                    : formData.database,
                  setUsedDb,
                  "database"
                )
              }
            >
              Add
            </button>
          </div>

          {formData.database === "Other" && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter other database"
              name="otherDatabase"
              value={formData.otherDatabase || ""}
              onChange={(e) =>
                onChange({
                  target: {
                    name: "otherDatabase",
                    value: e.target.value,
                  },
                })
              }
            />
          )}

          {errors.database && (
            <div className="invalid-feedback d-block">{errors.database}</div>
          )}

          <div className="badge-container mt-2">
            {renderStackBadges(usedDb, "database", setUsedDb)}
          </div>
        </div>
      </div>

      {/* OS */}
 <div className="form-group row mb-4">
      <label className="col-md-3 col-form-label">Operating System</label>
      <div className="col-md-6">
        <div className="input-group mb-2">
          <select
            className={`form-select ${errors.os ? "is-invalid" : ""}`}
            name="os"
            value={formData.os || ""}
            onChange={onChange}
          >
            <option value="">Select OS</option>
            {[...new Set(osData.map(item => item.os))].map((osName, idx) => (
              <option key={idx} value={osName}>{osName}</option>
            ))}
          </select>
        </div>

        {/* Version Dropdown (only if OS is selected) */}
        {filteredVersions.length > 0 && (
          <div className="input-group mb-2">
            <select
              className={`form-select ${errors.osVersion ? "is-invalid" : ""}`}
              name="osVersion"
              value={formData.osVersion || ""}
              onChange={onChange}
            >
              <option value="">Select OS Version</option>
              {filteredVersions.map((version, idx) => (
                <option key={idx} value={version}>{version}</option>
              ))}
            </select>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() =>
                addToStack(
                  "os",
                  `${formData.os} ${formData.osVersion}`,
                  setUsedOs,
                  "os"
                )
              }
              disabled={!formData.os || !formData.osVersion}
            >
              Add
            </button>
          </div>
        )}

        {errors.os && <div className="invalid-feedback">{errors.os}</div>}
        {errors.osVersion && <div className="invalid-feedback">{errors.osVersion}</div>}

        {/* Render badges */}
        <div className="badge-container mt-2">
          {renderStackBadges(usedOs, "os", setUsedOs)}
        </div>
      </div>
    </div>

      {/* OS Version */}
      {/* OS Version */}
      <div className="form-group row mb-4">
        
      </div>

      {/* Repository URL */}
      <div className="form-group row mb-4">
        <label className="col-md-3 col-form-label">
          Source Code Repository
        </label>
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className={`form-control ${errors.repoUrl ? "is-invalid" : ""}`}
              name="repoUrl"
              placeholder="https://github.com/your-repo"
              value={formData.repoUrl || ""}
              onChange={onChange}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleAddRepository}
            >
              Add
            </button>
          </div>

          {errors.repoUrl && (
            <div className="invalid-feedback">{errors.repoUrl}</div>
          )}

          {/* ✅ Replaced marginRight style with flex row layout */}
          <div className="mt-2 d-flex flex-wrap gap-2">
            {usedRepo.map((repo) => (
              <div
                key={repo}
                className="d-flex align-items-center mb-2"
                style={{
                  backgroundColor: "#f1f1f1",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
              >
                <a
                  href={repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={repo}
                  className="text-primary"
                  style={{
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "60vw", // Use screen width instead of fixed px
                    display: "inline-block",
                  }}
                >
                  {repo}
                </a>
                <button
                  type="button"
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() =>
                    window.confirm(
                      `Are you sure you want to delete:\n${repo}?`
                    ) && removeFromStack("repoUrl", repo, setUsedRepo)
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
            cursor: "pointer",
            padding: "10px 5px",
            background: "#a8dced",
          }}
        >
          Previous
        </button>

        <button
          type="button"
          className="btn btn-success"
          onClick={handleNextStep}
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
          Next
        </button>
      </div>
    </fieldset>
  );
};

export default StepTechnologyStack;

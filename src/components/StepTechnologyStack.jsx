
import React, { useState } from "react";
import "../css/mvpStyle.css";
import { toast } from "react-toastify";

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
}) => {
  const [errors, setErrors] = useState({});
  const [usedFrameworks, setUsedFrameworks] = useState([]);

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
      toast.error("Please enter a value before adding.");
      return;
    }

    if (field === "repoUrl" && !isValidUrl(value)) {
      setErrors((prev) => ({ ...prev, repoUrl: "Please enter a valid URL" }));
      toast.error("Invalid URL format.");
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
      toast.warn(`"${value}" already added to ${field.replace("Url", "")}.`);
      return;
    }

    setter((prev) => [...prev, value]);
    toast.success(`"${value}" added to ${field.replace("Url", "")}.`);

    setErrors((prev) => ({ ...prev, [field]: "" }));
    onChange({ target: { name: inputField, value: "" } });
  };

  const removeFromStack = (field, value, setter) => {
    setter((prev) => prev.filter((item) => item !== value));
    toast.info(`"${value}" removed from ${field.replace("Url", "")}.`);
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
        <label className="col-md-3 col-form-label">Front End Technology</label>
        <div className="col-md-6">
          <div className="input-group">
            <select
              className={`form-select ${errors.frontEnd ? "is-invalid" : ""}`}
              name="frontEnd"
              value={formData.frontEnd || ""}
              onChange={onChange}
            >
              <option value="">Select a front-end technology</option>
              <option value="Java">Java</option>
              <option value=".Net 4.5 & below">.Net 4.5 & below</option>
              <option value=".Net Core">.Net Core</option>
              <option value="Node JS">Node JS</option>
              <option value="PHP">PHP</option>
              <option value="NEXT JS">NEXT JS</option>
            </select>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() =>
                addToStack("frontEnd", formData.frontEnd, setUsedTech, "frontEnd")
              }
            >
              Add
            </button>
          </div>
          {errors.frontEnd && (
            <div className="invalid-feedback">{errors.frontEnd}</div>
          )}
          <div className="mt-2">
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
                addToStack("framework", formData.framework, setUsedFrameworks, "framework")
              }
            >
              Add
            </button>
          </div>
          {errors.framework && (
            <div className="invalid-feedback">{errors.framework}</div>
          )}
          <div className="mt-2">
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
              value={
                knownDatabases.includes(formData.database) ? formData.database : "Other"
              }
              onChange={onChange}
            >
              <option value="">Select a database</option>
              {knownDatabases.map((db) => (
                <option key={db} value={db}>{db}</option>
              ))}
              <option value="Other">Other</option>
            </select>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() =>
                addToStack("database", formData.database, setUsedDb, "database")
              }
            >
              Add
            </button>
          </div>

          {!knownDatabases.includes(formData.database) && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter other database"
              name="database"
              value={formData.database || ""}
              onChange={(e) =>
                onChange({
                  target: {
                    name: "database",
                    value: e.target.value,
                  },
                })
              }
            />
          )}

          {errors.database && (
            <div className="invalid-feedback d-block">{errors.database}</div>
          )}

          <div className="mt-2">
            {renderStackBadges(usedDb, "database", setUsedDb)}
          </div>
        </div>
      </div>

      {/* OS */}
      <div className="form-group row mb-4">
        <label className="col-md-3 col-form-label">Operating System</label>
        <div className="col-md-6">
          <div className="input-group">
            <select
              className={`form-select ${errors.os ? "is-invalid" : ""}`}
              name="os"
              value={formData.os || ""}
              onChange={onChange}
            >
              <option value="">Select an OS</option>
              <option value="Linux">Linux</option>
              <option value="Windows">Windows</option>
            </select>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => addToStack("os", formData.os, setUsedOs, "os")}
            >
              Add
            </button>
          </div>
          {errors.os && (
            <div className="invalid-feedback">{errors.os}</div>
          )}
          <div className="mt-2">
            {renderStackBadges(usedOs, "os", setUsedOs)}
          </div>
        </div>
      </div>

      {/* OS Version */}
      <div className="form-group row mb-4">
        <label className="col-md-3 col-form-label">OS Version</label>
        <div className="col-md-6">
          <div className="input-group">
            <select
              className={`form-select ${errors.osVersion ? "is-invalid" : ""}`}
              name="osVersion"
              value={formData.osVersion || ""}
              onChange={onChange}
            >
              <option value="">Select version</option>
              <option value="Version 1">Version 1</option>
              <option value="Version 2">Version 2</option>
            </select>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() =>
                addToStack("osVersion", formData.osVersion, setUsedOsVersion, "osVersion")
              }
            >
              Add
            </button>
          </div>
          {errors.osVersion && (
            <div className="invalid-feedback">{errors.osVersion}</div>
          )}
          <div className="mt-2">
            {renderStackBadges(usedOsVersion, "osVersion", setUsedOsVersion)}
          </div>
        </div>
      </div>

      {/* Repository URL */}
      <div className="form-group row mb-4">
        <label className="col-md-3 col-form-label">Source Code Repository</label>
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
          <div className="mt-2">
            {usedRepo.map((repo) => (
              <div key={repo} className="d-flex align-items-center mb-2">
                <a
                  href={repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-truncate me-2"
                  style={{ maxWidth: "300px" }}
                >
                  {repo}
                </a>
                <button
                  type="button"
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() =>
                    window.confirm(`Are you sure you want to delete:\n${repo}?`) &&
                    removeFromStack("repoUrl", repo, setUsedRepo)
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

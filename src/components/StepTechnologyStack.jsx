// StepTechnologyStack.js
import React, { useState } from "react";
import "../css/mvpStyle.css";

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

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const addToStack = (field, value, setter) => {
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Please select a value first",
      }));
      return;
    }

    if (field === "repoUrl" && !isValidUrl(value)) {
      setErrors((prev) => ({ ...prev, repoUrl: "Please enter a valid URL" }));
      return;
    }

    if (setter === setUsedRepo && usedRepo.includes(value)) {
      setNotification({
        show: true,
        message: "This repository is already added",
        type: "error",
      });
      setTimeout(() => setNotification({ show: false }), 3000);
      return;
    }

    setter((prev) => [...prev, value]);

    setNotification({
      show: true,
      message: `Added ${value} to ${field}`,
      type: "success",
    });
    setTimeout(() => setNotification({ show: false }), 3000);

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Always expect (field, value, setter)
  const removeFromStack = (field, value, setter) => {
    setter((prev) => prev.filter((item) => item !== value));
  };

  // Pass field name to removeFromStack
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
    if (!repoUrl) {
      setErrors((prev) => ({
        ...prev,
        repoUrl: "Please enter a repository URL",
      }));
      return;
    }
    addToStack("repoUrl", repoUrl, setUsedRepo);
  };

  const handleNextStep = () => {
    // Validate required fields
    const errors = {};
    let isValid = true;

    if (usedTech.length === 0) {
      errors.frontEnd = "Please add at least one front-end technology";
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

    if (!isValid) {
      setErrors(errors);
      return;
    }

    // All validations passed, proceed to next step
    onNext();
  };

  return (
    <fieldset className="technology-stack-form">
      <legend className="form-legend">Technology Stack</legend>

      {notification.show && (
        <div className={`alert alert-${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="form-section">
        {/* Front End Technologies */}
        <div className="form-group row mb-4">
          <label className="col-md-3 col-form-label">
            Front End Technology
          </label>
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
                <option value="Others">Others</option>
              </select>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() =>
                  addToStack("frontEnd", formData.frontEnd, setUsedTech)
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
        {/* <div className="form-group row mb-4">
          <label className="col-md-3 col-form-label">Framework(s)</label>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="framework"
              placeholder="Enter framework names (comma separated for multiple)"
              value={formData.framework || ""}
              onChange={onChange}
            />
          </div>
        </div> */}
        {/* Framework(s) */}
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
        onClick={() => addToStack("framework", formData.framework, setUsedFrameworks)}
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


        {/* Databases */}
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
                <option value="MongoDB">MongoDB</option>
                <option value="SQL Server">SQL Server</option>
                <option value="Redis">Redis</option>
                <option value="Post-gre SQL">PostgreSQL</option>
                <option value="Cassandra">Cassandra</option>
                <option value="MySQL">MySQL</option>
                <option value="Oracle">Oracle</option>
                <option value="Other">Other</option>
              </select>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() =>
                  addToStack("database", formData.database, setUsedDb)
                }
              >
                Add
              </button>
            </div>
            {errors.database && (
              <div className="invalid-feedback">{errors.database}</div>
            )}
            <div className="mt-2">
              {renderStackBadges(usedDb, "database", setUsedDb)}
            </div>
          </div>
        </div>

        {/* Operating System */}
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
                onClick={() => addToStack("os", formData.os, setUsedOs)}
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
                className="form-select"
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
                  addToStack("osVersion", formData.osVersion, setUsedOsVersion)
                }
              >
                Add
              </button>
            </div>
            <div className="mt-2">
              {renderStackBadges(usedOsVersion, "osVersion", setUsedOsVersion)}
            </div>
          </div>
        </div>

        {/* Repository URLs */}
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
                    className="btn-close btn-close-white ms-2"
                    onClick={() => removeFromStack(repo, setUsedRepo)}
                    aria-label={`Remove ${repo}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="form-navigation d-flex justify-content-between mt-5">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleNextStep}
        >
          Next
        </button>
      </div>
    </fieldset>
  );
};

export default StepTechnologyStack;

import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../css/mvpStyle.css";
import api from "../../Api"; // Adjust the import path as necessary
// const API = "http://localhost:5000"; // Your backend base URL

const TechnologyAndInfrastructure = ({
  project,
  showTech = false,
  showInfra = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  // const handleViewPdf = (filename) => {
  //   if (!filename) return;
  //   setPdfUrl(`${API}/va-reports/${filename}`);
  //   setShowModal(true);
  // };
const handleViewPdf = async (filename) => {
  if (!filename) {
    console.warn("No filename provided for PDF preview.");
    return;
  }

  const pdfPath = `${api}/va-reports/${filename}`;
  console.log("PDF View Requested:");
  console.log("  → Filename:", filename);
  console.log("  → Full PDF URL:", pdfPath);

  // Optional logging to backend
  try {
    await fetch(`${api}/log-va-view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assetsId: project.assetsId, // Make sure your project object includes this
        filename,
        viewer: "Admin", // Replace with actual viewer info if available (e.g. from auth)
      }),
    });
  } catch (err) {
    console.error("Error logging VA view:", err);
  }

  setPdfUrl(pdfPath);
  setShowModal(true);
};


  const closeModal = () => {
    setShowModal(false);
    setPdfUrl("");
  };

  const displayValue = (value) => {
    if (!value) return "N/A";
    if (Array.isArray(value)) return value.length ? value.join(", ") : "N/A";
    return value;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return "Invalid date";
    }
  };

  const vaRecord = project?.Infra?.vaRecords?.[0];
  return (
      <div className="tech-infra-container">
    <div className="">
      {showTech && (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Front End</th>
              <th>Framework</th>
              <th>Database</th>
              <th>OS</th>
              <th>OS Version</th>
              <th>Repository URLs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{displayValue(project?.TS?.frontend)}</td>
              <td>{displayValue(project?.TS?.framework)}</td>
              <td>{displayValue(project?.TS?.database)}</td>
              <td>{displayValue(project?.TS?.os)}</td>
              <td>{displayValue(project?.TS?.osVersion)}</td>
              <td>
                {project?.TS?.repoUrls?.length > 0
                  ? project.TS.repoUrls.map((url, index) => (
                      <div key={index}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {url}
                        </a>
                      </div>
                    ))
                  : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {showInfra && (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Server Type</th>
              <th>Data Centre</th>
              <th>Deployment</th>
              <th>Location</th>
              <th>Git URLs</th>
              <th>VA IP Address</th>
              <th>VA Purpose</th>
              <th>VA Date</th>
              <th>VA Score</th>
              <th>VA Report</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{project?.Infra?.typeOfServer || "N/A"}</td>
              <td>{project?.Infra?.dataCentre || "N/A"}</td>
              <td>{project?.Infra?.deployment || "N/A"}</td>
              <td>{project?.Infra?.location || "N/A"}</td>
              <td>
                {project?.Infra?.gitUrls?.length > 0
                  ? project.Infra.gitUrls.map((url, index) => (
                      <div key={index}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {url}
                        </a>
                      </div>
                    ))
                  : "N/A"}
              </td>
              <td>{vaRecord?.ipAddress || "N/A"}</td>
              <td>{vaRecord?.purposeOfUse || "N/A"}</td>
              <td>{formatDate(vaRecord?.dateOfVA)}</td>
              <td>{vaRecord?.vaScore || "N/A"}</td>
              <td>
                {vaRecord?.vaReport ? (
                  <button
                    className="btn btn-link text-danger p-0"
                    title="View VA Report"
                    onClick={() => handleViewPdf(vaRecord.vaReport)}
                  >
                    <i className="bi bi-file-earmark-pdf fs-5"></i>
                  </button>
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* PDF Viewer Modal */}
   {showModal && (
  <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">VA Report PDF</h5>
          <button className="btn-close" onClick={closeModal}></button>
        </div>
        <div className="modal-body" style={{ height: "80vh" }}>
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%"
            style={{ border: "none", minHeight: "70vh" }}
          />
        </div>
      </div>
    </div>
  </div>
)}

    </div>
    </div>
  );
};

TechnologyAndInfrastructure.propTypes = {
  project: PropTypes.shape({
    TS: PropTypes.shape({
      frontend: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
      framework: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
      database: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
      os: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
      osVersion: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
      repoUrls: PropTypes.arrayOf(PropTypes.string),
    }),
    Infra: PropTypes.shape({
      typeOfServer: PropTypes.string,
      location: PropTypes.string,
      deployment: PropTypes.string,
      dataCentre: PropTypes.string,
      gitUrls: PropTypes.arrayOf(PropTypes.string),
      vaRecords: PropTypes.arrayOf(
        PropTypes.shape({
          ipAddress: PropTypes.string,
          purposeOfUse: PropTypes.string,
          vaScore: PropTypes.string,
          dateOfVA: PropTypes.string,
          vaReport: PropTypes.string,
        })
      ),
      additionalInfra: PropTypes.array,
    }),
  }).isRequired,
  showTech: PropTypes.bool,
  showInfra: PropTypes.bool,
};

export default TechnologyAndInfrastructure;

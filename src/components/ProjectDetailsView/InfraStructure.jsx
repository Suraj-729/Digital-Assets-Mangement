

import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../css/mvpStyle.css";
import api, { baseURL } from "../../Api";
import Footer from "../layouts/FooterDashboard";

const TechnologyAndInfrastructure = ({
  project,
  showTech = false,
  showInfra = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const handleViewPdf = async (filename) => {
    if (!filename) {
      console.warn("No filename provided for PDF preview.");
      return;
    }

    const pdfPath = `${baseURL}va-reports/${filename}`;

    try {
      await api.post("/log-va-view", {
        assetsId: project.assetsId,
        filename,
        viewer: "Admin",
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
                
                <th>Repository URLs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{displayValue(project?.TS?.frontend)}</td>
                <td>{displayValue(project?.TS?.framework)}</td>
                <td>{displayValue(project?.TS?.database)}</td>
                <td>{displayValue(project?.TS?.os)}</td>
                
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
                <th>Antivirus</th>
                {/* <th>Git URLs</th> */}
                <th>VA IP Address</th>
                <th>database server ip</th>
                <th>VA Purpose</th>
                <th>VA Date</th>
                <th>VA Score</th>
                <th>VA Report</th>
              </tr>
            </thead>
            <tbody>
              {project?.Infra?.vaRecords?.length > 0 ? (
                project.Infra.vaRecords.map((record, idx) => (
                  <tr key={idx}>
                    <td>{project?.Infra?.typeOfServer || "N/A"}</td>
                    <td>{project?.Infra?.dataCentre || "N/A"}</td>
                    <td>{project?.Infra?.deployment || "N/A"}</td>
                    <td>{project?.Infra?.location || "N/A"}</td>
                    <td>{project?.Infra?.antivirus || "N/A"}</td>
                    {/* <td>
                      {project?.Infra?.gitUrls?.length > 0
                        ? project.Infra.gitUrls.map((url, index) => (
                            <div key={index}>
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {url}
                              </a>
                            </div>
                          ))
                        : "N/A"}
                    </td> */}
                    <td>{record.ipAddress || "N/A"}</td>
                    <td>{record.dbServer || "N/A"}</td>
                    <td>{record.purposeOfUse || "N/A"}</td>
                    <td>{formatDate(record.dateOfVA)}</td>
                    <td>{record.vaScore || "N/A"}</td>
                    <td>
                      {record.vaReport ? (
                        <button
                          className="btn btn-link text-danger p-0"
                          title="View VA Report"
                          onClick={() => handleViewPdf(record.vaReport)}
                        >
                          <i className="bi bi-file-earmark-pdf fs-5"></i>
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center">
                    No VA Records Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* PDF Viewer Modal */}
        {showModal && (
          <div
            className="modal fade show"
            style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          >
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
      antivirus:PropTypes.string,
      deployment: PropTypes.string,
      dataCentre: PropTypes.string,
      gitUrls: PropTypes.arrayOf(PropTypes.string),
      vaRecords: PropTypes.arrayOf(
        PropTypes.shape({
          ipAddress: PropTypes.string,
          dbServer: PropTypes.string,
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


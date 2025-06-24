import React, { useState } from "react";
import PropTypes from "prop-types";
import BasicProfile from "./BasicProfile";
import SecurityAudit from "./SecurityAudit";
import TechnologyAndInfrastructure from "./InfraStructure";

const ProjectTabs = ({ project }) => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <>
      <ul className="nav nav-tabs nav-tabs-bordered">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "basic" && "active"}`}
            onClick={() => setActiveTab("basic")}
          >
            <img src="assets/img/icons/BasicProfile.png" alt="Basic Profile" />{" "}
            Basic Profile
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "security" && "active"}`}
            onClick={() => setActiveTab("security")}
          >
            <img
              src="assets/img/icons/security-audit.png"
              alt="Security Audit"
            />{" "}
            Security Audit
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tech" && "active"}`}
            onClick={() => setActiveTab("tech")}
          >
            <img
              src="assets/img/icons/TechnologyStack.png"
              alt="Technology Stack"
            />{" "}
            Technology Stack
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "infra" && "active"}`}
            onClick={() => setActiveTab("infra")}
          >
            <img
              src="assets/img/icons/infrastructure.png"
              alt="Infrastructure"
            />{" "}
            Infrastructure
          </button>
        </li>
      </ul>

      <div className="tab-content pt-2">
        {activeTab === "basic" && <BasicProfile project={project} />}
        {activeTab === "security" && (
          <SecurityAudit securityAudits={project?.SA?.securityAudit || []} />
        )}
        {activeTab === "tech" && (
          <TechnologyAndInfrastructure project={project} showTech />
        )}
        {activeTab === "infra" && (
          <TechnologyAndInfrastructure project={project} showInfra />
        )}
      </div>
    </>
  );
};

ProjectTabs.propTypes = {
  project: PropTypes.shape({
    projectName: PropTypes.string,
    BP: PropTypes.shape({
      prismId: PropTypes.string,
      deptName: PropTypes.string,
      url: PropTypes.string,
      publicIp: PropTypes.string,
      HOD: PropTypes.string,
      nodalOfficerNIC: PropTypes.shape({
        name: PropTypes.string,
        empCode: PropTypes.string,
        mobile: PropTypes.string,
        email: PropTypes.string,
      }),
      nodalOfficerDept: PropTypes.shape({
        name: PropTypes.string,
        designation: PropTypes.string,
        mobile: PropTypes.string,
        email: PropTypes.string,
      }),
    }),
    SA: PropTypes.shape({
      securityAudit: PropTypes.arrayOf(
        PropTypes.shape({
          "Sl no": PropTypes.number,
          typeOfAudit: PropTypes.string,
          auditingAgency: PropTypes.string,
          auditDate: PropTypes.instanceOf(Date),
          expireDate: PropTypes.instanceOf(Date),
          tlsNextExpiry: PropTypes.instanceOf(Date),
          sslLabScore: PropTypes.string,
          certificate: PropTypes.string,
        })
      ),
    }),
    TS: PropTypes.object,
    Infra: PropTypes.object,
  }).isRequired,
};

export default ProjectTabs;

// components/ProjectTabs.jsx
import React, { useState } from "react";
import BasicProfile from "./BasicProfile";
import SecurityAudit from "./SecurityAudit";
import TechnologyAndInfrastructure from "./InfraStructure";

const ProjectTabs = () => {
  const [activeTab, setActiveTab] = useState("basic");
  
  return (
    <>
      <ul className="nav nav-tabs nav-tabs-bordered">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "basic" && "active"}`} onClick={() => setActiveTab("basic")}>
            <img src="assets/img/icons/BasicProfile.png" alt="" /> Basic Profile
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "security" && "active"}`} onClick={() => setActiveTab("security")}>
            <img src="assets/img/icons/security-audit.png" alt="" /> Security Audit
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "tech" && "active"}`} onClick={() => setActiveTab("tech")}> 
            <img src="assets/img/icons/TechnologyStack.png" alt="" /> Technology Stack
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "infra" && "active"}`} onClick={() => setActiveTab("infra")}> 
            <img src="assets/img/icons/infrastructure.png" alt="" /> Infrastructure
          </button>
        </li>
      </ul>

      <div className="tab-content pt-2">
        {activeTab === "basic" && <BasicProfile />}
        {activeTab === "security" && <SecurityAudit />}
        {activeTab === "tech" && <TechnologyAndInfrastructure showTech />} 
        {activeTab === "infra" && <TechnologyAndInfrastructure showInfra />} 
      </div>
    </>
  );
};

export default ProjectTabs;

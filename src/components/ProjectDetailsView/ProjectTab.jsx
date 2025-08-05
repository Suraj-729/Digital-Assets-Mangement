import React, { useState, useEffect } from "react";
import BasicProfile from "./BasicProfile";
import SecurityAudit from "./SecurityAudit";
import TechnologyAndInfrastructure from "./InfraStructure";
import TlsInfo from "./TlsInfo";
import DrInfo from "./DrInfo";
import { useParams } from "react-router-dom";
import api from "../../Api";
import Header from "../layouts/HeaderDashboard";
import Sidebar from "../layouts/SidebarDashboard";
import Footer from "../layouts/FooterDashboard";
import "../../css/mvpStyle.css";
import { motion, AnimatePresence } from "framer-motion";

const TAB_CONFIG = [
  { id: "basic", label: "Basic Profile", icon: "BasicProfile.png" },
  { id: "tls", label: "TLS Info", icon: "ssl.png" },           // Add TLS tab
                // Add DR tab
  { id: "security", label: "Security Audit", icon: "security-audit.png" },
  { id: "tech", label: "Technology Stack", icon: "TechnologyStack.png" },
  { id: "infra", label: "Infrastructure", icon: "infrastructure.png" },
  { id: "dr", label: "DR Info", icon: "dr.png" },
];

const ProjectTabs = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [project, setProject] = useState(null);
  const { projectName } = useParams();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [formToShow, setFormToShow] = useState(null);

  useEffect(() => {
    async function fetchProjectDetails() {
      try {
        const response = await api.get(`/dashboard/projectDetails/${projectName}`);
        setProject(response.data); // ✅ Set the project data to state
      } catch (error) {
        console.error("Failed to fetch project details:", error);
      }
    }

    fetchProjectDetails();
  }, [projectName]);

  if (!project) return <div>Loading project...</div>; // Optional: loading state

  return (
    <div className={`project-tabs-container form-container ${isSidebarOpen ? "compact-form" : "fullscreen-form"}`}>
      <Header onSidebarToggle={setSidebarOpen} />
      {/* Project Title */}
      <motion.div
        className="project-details-heading px-4 pt-4 mb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h3 style={{ fontWeight: "600", color: "#333", fontSize: "26px" }}>
          Project Details:{" "}
          <span style={{ color: "#1E90FF", fontSize: "20px", fontWeight: "normal" }}>
            {project?.basicDetails?.projectName || projectName}
          </span>
        </h3>
      </motion.div>

      <Sidebar isSidebarOpen={isSidebarOpen}
        setFormToShow={setFormToShow} />
      <ul className="nav nav-tabs nav-tabs-bordered mt-5" role="tablist">

        {TAB_CONFIG.map((tab) => (
          <li className="nav-item" key={tab.id} role="presentation">
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-tab`}
            >
              <img
                src={`/images/icons/${tab.icon}`}
                alt={tab.label}
                style={{ marginRight: "5px" }}
                width="20"
                height="20"
              />
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content pt-3">
        <AnimatePresence mode="wait">
          {activeTab === "basic" && (
            <motion.div key="basic" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <BasicProfile project={project} />
            </motion.div>
          )}
          {activeTab === "tls" && (
            <motion.div key="tls" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <TlsInfo tlsRecords={project?.TLS?.tlsInfo || []} />
            </motion.div>
          )}
          {activeTab === "dr" && (
            <motion.div key="dr" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <DrInfo drData={project?.DR || {}} />
            </motion.div>
          )}
          {activeTab === "security" && (
            <motion.div key="security" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
              <SecurityAudit securityAudits={project?.SA?.securityAudit || []} />
            </motion.div>
          )}
          {activeTab === "tech" && (
            <motion.div key="tech" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}>
              <TechnologyAndInfrastructure project={project} showTech />
            </motion.div>
          )}
          {activeTab === "infra" && (
            <motion.div key="infra" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.4 }}>
              <TechnologyAndInfrastructure project={project} showInfra />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
       </div>
    
  );
  
};

export default ProjectTabs;

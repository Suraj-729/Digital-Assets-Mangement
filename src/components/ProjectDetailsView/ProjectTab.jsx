
// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import BasicProfile from "./BasicProfile";
// import SecurityAudit from "./SecurityAudit";
// import TechnologyAndInfrastructure from "./InfraStructure";

// const TAB_CONFIG = [
//   { id: "basic", label: "Basic Profile", icon: "BasicProfile.png" },
//   { id: "security", label: "Security Audit", icon: "security-audit.png" },
//   { id: "tech", label: "Technology Stack", icon: "TechnologyStack.png" },
//   { id: "infra", label: "Infrastructure", icon: "infrastructure.png" },
// ];

// const ProjectTabs = ({ project }) => {
//   const [activeTab, setActiveTab] = useState("basic");
//   const { projectName } = useParams();

//  
//   return (
//     <div className="project-tabs-container">
//       <ul className="nav nav-tabs nav-tabs-bordered" role="tablist">
//         {TAB_CONFIG.map((tab) => (
//           <li className="nav-item" key={tab.id} role="presentation">
//             <button
//               className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
//               onClick={() => setActiveTab(tab.id)}
//               role="tab"
//               aria-selected={activeTab === tab.id}
//               aria-controls={`${tab.id}-tab`}
//             >
//               <img
//                  src={`/images/icons/${tab.icon}`}
                
//                 alt={tab.label}
//                 style={{ marginRight: "5px" }}
//                 width="20"
//                 height="20"
//               />
//               {tab.label}
//             </button>
//           </li>
//         ))}
//       </ul>

//       <div className="tab-content pt-3">
//         {activeTab === "basic" && (
//           <div id="basic-tab" role="tabpanel" aria-labelledby="basic-tab">
//             <BasicProfile project={project} />
//           </div>
//         )}
//         {activeTab === "security" && (
//           <div id="security-tab" role="tabpanel" aria-labelledby="security-tab">
//             <SecurityAudit securityAudits={project?.SA?.securityAudit || []} />
//           </div>
//         )}
//         {activeTab === "tech" && (
//           <div id="tech-tab" role="tabpanel" aria-labelledby="tech-tab">
//             <TechnologyAndInfrastructure project={project} showTech />
//           </div>
//         )}
//         {activeTab === "infra" && (
//           <div id="infra-tab" role="tabpanel" aria-labelledby="infra-tab">
//             <TechnologyAndInfrastructure project={project} showInfra />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// ProjectTabs.propTypes = {
//   project: PropTypes.shape({
//     projectName: PropTypes.string,
//     BP: PropTypes.shape({
//       prismId: PropTypes.string,
//       deptName: PropTypes.string,
//       url: PropTypes.string,
//       publicIp: PropTypes.string,
//       HOD: PropTypes.string,
//       nodalOfficerNIC: PropTypes.shape({
//         name: PropTypes.string,
//         empCode: PropTypes.string,
//         mobile: PropTypes.string,
//         email: PropTypes.string,
//       }),
//       nodalOfficerDept: PropTypes.shape({
//         name: PropTypes.string,
//         designation: PropTypes.string,
//         mobile: PropTypes.string,
//         email: PropTypes.string,
//       }),
//     }),
//     SA: PropTypes.shape({
//       securityAudit: PropTypes.arrayOf(
//         PropTypes.shape({
//           "Sl no": PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//           typeOfAudit: PropTypes.string,
//           auditingAgency: PropTypes.string,
//           auditDate: PropTypes.oneOfType([
//             PropTypes.string,
//             PropTypes.shape({ $date: PropTypes.string }),
//           ]),
//           expireDate: PropTypes.oneOfType([
//             PropTypes.string,
//             PropTypes.shape({ $date: PropTypes.string }),
//           ]),
//           tlsNextExpiry: PropTypes.oneOfType([
//             PropTypes.string,
//             PropTypes.shape({ $date: PropTypes.string }),
//           ]),
//           sslLabScore: PropTypes.string,
//           certificate: PropTypes.string,
//         })
//       ),
//     }),
//     TS: PropTypes.shape({
//       frontEnd: PropTypes.arrayOf(PropTypes.string),
//       framework: PropTypes.arrayOf(PropTypes.string),
//       database: PropTypes.arrayOf(PropTypes.string),
//       os: PropTypes.arrayOf(PropTypes.string),
//       osVersion: PropTypes.string,
//       sourceCodeRepoUrl: PropTypes.string,
//     }),
//     Infra: PropTypes.shape({
//       typeOfServer: PropTypes.string,
//       location: PropTypes.string,
//       deployment: PropTypes.string,
//       dataCentre: PropTypes.string,
//       gitUrls: PropTypes.arrayOf(PropTypes.string),
//       vaRecords: PropTypes.arrayOf(
//         PropTypes.shape({
//           ipAddress: PropTypes.string,
//           purposeOfUse: PropTypes.string,
//           vaScore: PropTypes.string,
//           dateOfVA: PropTypes.string,
//           vaReport: PropTypes.string,
//         })
//       ),
//       additionalInfra: PropTypes.array,
//     }),
//   }).isRequired,
// };

// export default ProjectTabs;
import React, { useState, useEffect } from "react";
import BasicProfile from "./BasicProfile";
import SecurityAudit from "./SecurityAudit";
import TechnologyAndInfrastructure from "./InfraStructure";
import { useParams } from "react-router-dom";
import api from "../../Api";
import Header from "../layouts/HeaderDashboard";
import Sidebar from "../layouts/SidebarDashboard";

const TAB_CONFIG = [
  { id: "basic", label: "Basic Profile", icon: "BasicProfile.png" },
  { id: "security", label: "Security Audit", icon: "security-audit.png" },
  { id: "tech", label: "Technology Stack", icon: "TechnologyStack.png" },
  { id: "infra", label: "Infrastructure", icon: "infrastructure.png" },
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

     <Sidebar isSidebarOpen={isSidebarOpen} 
     setFormToShow={setFormToShow}/>
      <ul className="nav nav-tabs nav-tabs-bordered" role="tablist">
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
    </div>
  );
};

export default ProjectTabs;

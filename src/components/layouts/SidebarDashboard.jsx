// import React, { useState } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import "../../css/mvpStyle.css";

// const Sidebar = ({ setFormToShow, isSidebarOpen }) => {
//   // const [groupHeadsOpen, setGroupHeadsOpen] = useState(false);
//   const [projectsOpen, setProjectsOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Get employeeType and trim whitespace
//   // const employeeType = (localStorage.getItem("employeeType") || "").trim();

//   return (
//     <aside id="sidebar" className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}>
//       <ul className="sidebar-nav" id="sidebar-nav">
//         {/* Dashboard */}
//         <li className="nav-item">
//           <Link
//             className={`nav-link ${location.pathname === "/dashboard" ? "" : "collapsed"}`}
//             to="/dashboard"
//             onClick={() => setFormToShow(null)}
//           >
//             <i className="bi bi-grid"></i>
//             <span>Dashboard</span>
//           </Link>
//         </li>

//         {/* Group Heads Dropdown - Only show if employeeType is ADMIN */}
//         {/* {employeeType === "Admin" && (
//           <li className="nav-item">
//             <div
//               className={`nav-link ${groupHeadsOpen ? "" : "collapsed"}`}
//               onClick={() => setGroupHeadsOpen(!groupHeadsOpen)}
//               style={{ cursor: "pointer" }}
//             >
//               <i className="bi bi-person"></i>
//               <span>Group Heads</span>
//               <i className="bi bi-chevron-down ms-auto"></i>
//             </div>
//             {groupHeadsOpen && (
//               <ul className="nav-content show" style={{ paddingLeft: "20px" }}>
//                 <li>
//                   <div
//                     className="nav-link"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => {
//                       // Add your navigation or form logic here
//                       // Example: navigate("/add-group-heads");
//                     }}
//                   >
//                     <i className="bi bi-circle"></i>
//                     <span>Add Group Heads</span>
//                   </div>
//                 </li>
//                 <li>
//                   <div
//                     className="nav-link"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => {
//                       // Add your navigation or form logic here
//                       // Example: navigate("/view-manage-gh");
//                     }}
//                   >
//                     <i className="bi bi-circle"></i>
//                     <span>View / Manage GH</span>
//                   </div>
//                 </li>
//               </ul>
//             )}
//           </li>
//         )} */}

//         {/* Projects Dropdown */}
//         <li className="nav-item">
//           <div
//             className={`nav-link ${projectsOpen ? "" : "collapsed"}`}
//             onClick={() => setProjectsOpen(!projectsOpen)}
//             style={{ cursor: "pointer" }}
//           >
//             <i className="bi bi-menu-button-wide"></i>
//             <span>Projects</span>
//             <i className="bi bi-chevron-down ms-auto"></i>
//           </div>
//           {projectsOpen && (
//             <ul className="nav-content show" style={{ paddingLeft: "20px" }}>
//               <li>
//                 <div
//                   className="nav-link"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => {
//                     setFormToShow("addProject");
//                     // Optionally navigate to a route if needed
//                     // navigate("/add-project");
//                   }}
//                 >
//                   <i className="bi bi-circle"></i>
//                   <span>Add Projects</span>
//                 </div>
//               </li>
              
//               <li>
//                 <div
//                   className="nav-link"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => {
//                     setFormToShow("projectDetails");
//                     // Optionally navigate to a route if needed
//                     // navigate("/project-details");
//                   }}
//                 >
//                   {/* <i className="bi bi-circle"></i>
//                   <span>ProjectDetails</span> */}
//                 </div>
//               </li>
//             </ul>
//           )}
//         </li>
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import "../../css/mvpStyle.css";
import { toast } from "react-toastify";
import api from "../../Api";
const Sidebar = ({setFormToShow, isSidebarOpen }) => {
  // const [groupHeadsOpen, setGroupHeadsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  // const location = useLocation();
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const employeeId = localStorage.getItem("employeeId");
const employeeType = localStorage.getItem("employeeType");

  // Get employeeType and trim whitespace
  // const employeeType = (localStorage.getItem("employeeType") || "").trim();
  const handleDashboardClick = async () => {
    setFormToShow(null);
    setLoading(true);
    try {
      const url = `/dashboard/by-type/${employeeId}?employeeType=${employeeType}`;
      const response = await api.get(url, { withCredentials: true });

      console.log("API response:", response.data);

      if (response.status >= 200 && response.status < 300) 
      {
        navigate("/dashboard", {
          state: {
            fetchedProjects: response.data,
            employeeId,
          employeeType,
          },
        });
      } else {
        toast.error(`Failed to fetch projects. Status: ${response.status}`);
      }
    } catch (err) {
      toast.error(`Error fetching projects: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <aside id="sidebar" className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}>
        <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <div
            className="nav-link"
            onClick={handleDashboardClick}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
            {loading && <span className="spinner-border spinner-border-sm ms-2" />}
          </div>
        </li>

        {/* Projects Dropdown */}
        <li className="nav-item">
          <div
            className={`nav-link ${projectsOpen ? "" : "collapsed"}`}
            onClick={() => setProjectsOpen(!projectsOpen)}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-menu-button-wide"></i>
            <span>Projects</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </div>
          {projectsOpen && (
            <ul className="nav-content show" style={{ paddingLeft: "20px" }}>
              <li>
                <div
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => setFormToShow("addProject")}
                >
                  <i className="bi bi-circle"></i>
                  <span>Add Projects</span>
                </div>
              </li>

              {/* <li>
                <div
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => setFormToShow("projectDetails")}
                >
                  <i className="bi bi-circle"></i>
                  <span>Project Details</span>
                </div>
              </li> */}
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;


// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "../../css/mvpStyle.css";
// import { toast } from "react-toastify";
// import api from "../../Api";

// const Sidebar = ({ setFormToShow, isSidebarOpen }) => {
//   const [projectsOpen, setProjectsOpen] = useState(false);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const employeeId = localStorage.getItem("employeeId");
//   const employeeType = localStorage.getItem("employeeType");
//   const location = useLocation();
//   const formToShow = location.state?.formToShow;

//   // ✅ Detect if on edit or add project page
//   const isEditPage = location.pathname.toLowerCase().includes("editproject");
//   const isAddPage =
//     location.pathname.toLowerCase().includes("addproject") ||
//     location.pathname.toLowerCase().includes("addprojectbyhod");

//   const handleDashboardClick = async () => {
//     setFormToShow(null);
//     setLoading(true);
//     try {
//       const url = `/dashboard/by-type/${employeeId}?employeeType=${employeeType}`;
//       const response = await api.get(url, { withCredentials: true });

//       if (response.status >= 200 && response.status < 300) {
//         navigate("/dashboard", {
//           state: {
//             fetchedProjects: response.data,
//             employeeId,
//             employeeType,
//           },
//         });
//       } else {
//         toast.error(`Failed to fetch projects. Status: ${response.status}`);
//       }
//     } catch (err) {
//       toast.error(`Error fetching projects: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <aside
//       id="sidebar"
//       className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}
//     >
//      <ul className="sidebar-nav" id="sidebar-nav">
//   {/* Dashboard Link: hide on edit page */}
//   {!isEditPage && (
//     <li className="nav-item">
//       <div
//         className="nav-link"
//         onClick={handleDashboardClick}
//         style={{ cursor: "pointer" }}
//       >
//         <i className="bi bi-grid"></i>
//         <span>Dashboard</span>
//         {loading && (
//           <span className="spinner-border spinner-border-sm ms-2" />
//         )}
//       </div>
//     </li>
//   )}

//   {/* Projects Dropdown */}
//   <li className="nav-item">
//     <div
//       className={`nav-link ${projectsOpen ? "" : "collapsed"}`}
//       onClick={() => setProjectsOpen(!projectsOpen)}
//       style={{ cursor: "pointer" }}
//     >
//       <i className="bi bi-menu-button-wide"></i>
//       <span>Projects</span>
//       <i className="bi bi-chevron-down ms-auto"></i>
//     </div>

//     {projectsOpen && (
//       <ul className="nav-content show" style={{ paddingLeft: "20px" }}>
//         {/* HOD Add Project */}
//         {employeeType === "HOD" && !isEditPage && !isAddPage && (
//           <li>
//             <div
//               className="nav-link"
//               style={{ cursor: "pointer" }}
//               onClick={() => navigate("/dashboard/addProjectByHOD")}
//             >
//               <i className="bi bi-circle"></i>
//               <span>Add Projects (HOD)</span>
//             </div>
//           </li>
//         )}

//         {/* PM Add Project */}
//         {employeeType === "PM" && !isEditPage && !isAddPage && (
//           <li>
//             <div
//               className="nav-link"
//               style={{ cursor: "pointer" }}
//               onClick={() => {
//                 setFormToShow("addProject");
//                 navigate("/dashboard/addProject", {
//                   state: { formToShow: "addProject" },
//                 });
//               }}
//             >
//               <i className="bi bi-circle"></i>
//               <span>Add Projects (PM)</span>
//             </div>
//           </li>
//         )}
//       </ul>
//     )}
//   </li>
// </ul>
//     </aside>
//   );
// };

// export default Sidebar;
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../css/mvpStyle.css";
import { toast } from "react-toastify";
import api from "../../Api";

const Sidebar = ({ setFormToShow, isSidebarOpen }) => {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const employeeId = localStorage.getItem("employeeId");
  const employeeType = localStorage.getItem("employeeType");
  const location = useLocation();
  const formToShow = location.state?.formToShow;

  const handleDashboardClick = async () => {
    setFormToShow(null);
    setLoading(true);
    try {
      const url = `/dashboard/by-type/${employeeId}?employeeType=${employeeType}`;
      const response = await api.get(url, { withCredentials: true });

      if (response.status >= 200 && response.status < 300) {
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
    <aside
      id="sidebar"
      className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}
    >
      <ul className="sidebar-nav" id="sidebar-nav">
        {/* Dashboard Link: always visible */}
        <li className="nav-item">
          <div
            className="nav-link"
            onClick={handleDashboardClick}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
            {loading && (
              <span className="spinner-border spinner-border-sm ms-2" />
            )}
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
              {/* HOD Add Project */}
              {employeeType === "HOD" && (
                <li>
                  <div
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/dashboard/addProjectByHOD")}
                  >
                    <i className="bi bi-circle"></i>
                    <span>Add Projects (HOD)</span>
                  </div>
                </li>
              )}

              {/* PM Add Project */}
              {employeeType === "PM" && (
                <li>
                  <div
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setFormToShow("addProject");
                      navigate("/dashboard/addProject", {
                        state: { formToShow: "addProject" },
                      });
                    }}
                  >
                    <i className="bi bi-circle"></i>
                    <span>Add Projects (PM)</span>
                  </div>
                </li>
              )}
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

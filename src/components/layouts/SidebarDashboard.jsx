import React, { useState } from "react";
import { useNavigate , useLocation } from "react-router-dom";
import "../../css/mvpStyle.css";
import { toast } from "react-toastify";

import api from "../../Api";
const Sidebar = ({ setFormToShow, isSidebarOpen }) => {
  // const [groupHeadsOpen, setGroupHeadsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  // const location = useLocation();
  // const navigate = useNavigate();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const employeeId = localStorage.getItem("employeeId");
  const employeeType = localStorage.getItem("employeeType");
 const location = useLocation();
 const formToShow = location.state?.formToShow;
  // Get employeeType and trim whitespace
  // const employeeType = (localStorage.getItem("employeeType") || "").trim();
  const handleDashboardClick = async () => {
    setFormToShow(null);
    setLoading(true);
    try {
      const url = `/dashboard/by-type/${employeeId}?employeeType=${employeeType}`;
      const response = await api.get(url, { withCredentials: true });

      console.log("API response:", response.data);

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
              {/* Only show to NON-PM users */}
              {employeeType === "HOD" && (
                <li>
                  <div
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/dashboard/addProjectByHOD");
                    }}
                  >
                    <i className="bi bi-circle"></i>
                    <span>Add Projects (HOD)</span>
                  </div>
                </li>
              )}

              {employeeType === "PM" && (
                <li>
                  <div
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    // onClick={() => {
                    //   setFormToShow("addProject");
                    //   navigate("/dashboard/addProject", {
                    //     state: { formToShow: "addProject" },
                    //   });
                    // }}
                    onClick={() => {
  // Only trigger if not already on addProject page
  if (!location.pathname.includes("EDITProject")) {
    setFormToShow("addProject");
    navigate("/dashboard/addProject", {
      state: { formToShow: "addProject" },
    });
  }
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

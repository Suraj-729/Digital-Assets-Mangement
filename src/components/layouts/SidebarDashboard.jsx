import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/mvpStyle.css";

const Sidebar = ({ setFormToShow }) => {
  const [groupHeadsOpen, setGroupHeadsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const navigate = useNavigate();

  // Get employeeType and trim whitespace
  const employeeType = (localStorage.getItem("employeeType") || "").trim();

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {/* Dashboard */}
        <li className="nav-item">
          <a
            className="nav-link"
            role="button"
            onClick={() => {
              const employeeType = localStorage.getItem("employeeType");
              if (employeeType) {
                navigate(`/damLogin/${employeeType}`);
              } else {
                navigate("/");
              }
            }}
          >
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
        </li>

        {/* Group Heads Dropdown - Only show if employeeType is ADMIN */}
        {employeeType === "Admin" && (
          <li className="nav-item">
            <div
              className={`nav-link ${groupHeadsOpen ? "" : "collapsed"}`}
              onClick={() => setGroupHeadsOpen(!groupHeadsOpen)}
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-person"></i>
              <span>Group Heads</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </div>
            {groupHeadsOpen && (
              <ul className="nav-content show" style={{ paddingLeft: "20px" }}>
                <li>
                  <Link to="#">
                    <i className="bi bi-circle"></i>
                    <span>Add Group Heads</span>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="bi bi-circle"></i>
                    <span>View / Manage GH</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}

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
                <Link
                  to="#"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setFormToShow("addProject");
                  }}
                >
                  <i className="bi bi-circle"></i>
                  <span>Add Projects</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link">
                  <i className="bi bi-circle"></i>
                  <span>View / Manage Projects</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setFormToShow("projectDetails");
                  }}
                >
                  {/* <i className="bi bi-circle"></i>
                  <span>ProjectDetails</span> */}
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

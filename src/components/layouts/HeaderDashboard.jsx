
// export default Header;
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/mvpStyle.css";
import api from "../../Api";
import MultiStepForm from "../MultiStepForm"; // Adjust the import based on your file structure
// import ThemeToggle from "./ThemeToggle"; // Adjust path if needed
// import ThemeToggle from "./"
const Header = ({ onSidebarToggle }) => {
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [formToShow, setFormToShow] = useState(null);
  const [selectedProjectData, setSelectedProjectData] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await api.get("/notifications/expiring-certificates", {
          withCredentials: true,
        });
        setNotifications(res.data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    }
    fetchNotifications();
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const handleSignOut = async () => {
    try {
      await api.post("/users/logout");
      localStorage.clear();
      setProfileDropdownOpen(false);
      navigate("/damLogin");
    } catch {
      alert("Logout failed");
    }
  };

  const toggleDropdown = () => setDropdownOpen((open) => !open);
  const toggleProfileDropdown = () => setProfileDropdownOpen((open) => !open);

  const toggleSidebar = () => {
    const newSidebarState = !isSidebarOpen;
    setSidebarOpen(newSidebarState);
    if (onSidebarToggle) {
      onSidebarToggle(newSidebarState);
    }
    document.body.classList.toggle("sidebar-collapsed", !newSidebarState);
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link to="" className="logo d-flex align-items-center">
          <img src="../../../images/logo.png" alt="Logo" />
        </Link>
        <i
          className="bi bi-list toggle-sidebar-btn"
          onClick={toggleSidebar}
          style={{ cursor: "pointer", fontSize: "1.5rem", marginLeft: "-50px" }}
          title="Toggle Sidebar"
        ></i>
      </div>


      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            {/* <Link className="nav-link nav-icon search-bar-toggle" to="#">
              <i className="bi bi-search"></i>
            </Link> */}
          </li>

          {/* Notifications */}
          <li className="nav-item dropdown">
            <Link
              className="nav-link nav-icon"
              to="#"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown();
              }}
            >
              <i className="bi bi-bell"></i>
              {notifications.length > 0 && (
                <span className="badge bg-primary badge-number">
                  {notifications.length}
                </span>
              )}
            </Link>

            
              {dropdownOpen && (
 <ul
  className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications show"
  style={{
    maxHeight: "400px",
    overflowY: "auto",
    borderRadius: "12px",
    padding: "0px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
    width: "360px",
    background: "#fff",
  }}
>

             <li
  className="dropdown-header d-flex justify-content-between align-items-center"
  style={{
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
    fontWeight: "600",
    fontSize: "1rem",
    background: "#f5f5f5",
  }}
>
  <span>🔔 You have {notifications.length} new notification{notifications.length !== 1 ? "s" : ""}</span>
  <button
    className="btn btn-sm btn-outline-danger"
    onClick={() => setDropdownOpen(false)}
    title="Close"
    style={{
      padding: "2px 8px",
      fontSize: "0.9rem",
      borderRadius: "50%",
    }}
  >
    ✕
  </button>
</li>

            {notifications.map((note, idx) => (
  <li
    key={idx}
    className="notification-item"
    style={{
      display: "flex",
      gap: "12px",
      padding: "12px 16px",
      alignItems: "flex-start",
      background: "#fff",
      borderBottom: "1px solid #eee",
      transition: "background 0.2s ease-in-out",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = "#f9f9f9"}
    onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
  >
    <div style={{ flexShrink: 0 }}>
      <i
        className="bi bi-exclamation-triangle-fill"
        style={{
          fontSize: "1.6rem",
          color: "#f39c12",
          marginTop: "4px",
        }}
      ></i>
    </div>

    <div style={{ flexGrow: 1 }}>
      <div style={{ fontWeight: "600", fontSize: "1rem", color: "#333" }}>
        {note.projectName}
      </div>
      <div style={{ fontSize: "0.9rem", color: "#555", marginTop: "2px" }}>
        {note.message}
      </div>
      <div
        style={{
          fontSize: "0.8rem",
          color:
            note.daysLeft <= 2
              ? "#e74c3c"
              : note.daysLeft <= 7
              ? "#f39c12"
              : "#2ecc71",
          fontWeight: "bold",
          marginTop: "4px",
        }}
      >
        {note.daysLeft} day{note.daysLeft !== 1 ? "s" : ""} remaining
      </div>
    </div>
  </li>
))}


                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            )}
          </li>

          {/* Profile Dropdown */}
          <li className="nav-item dropdown pe-3" ref={profileRef}>
            <Link
              className="nav-link nav-profile d-flex align-items-center pe-0"
              to="#"
              aria-haspopup="true"
              aria-expanded={profileDropdownOpen}
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                toggleProfileDropdown();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleProfileDropdown();
                }
              }}
            >
              <img
                src="../../../images/profile-img.jpg"
                alt="Profile"
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                NIC BBSR

                {/* <i className="bi bi-caret-down-fill" style={{ fontSize: 12, marginLeft: 4 }}></i> */}

              </span>
            </Link>

            {profileDropdownOpen && (
              <ul
                className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile show"
                style={{ minWidth: 220, maxHeight: 350, overflowY: "auto" }}
                role="menu"
                aria-label="Profile menu"
              >
                <li className="dropdown-header">
                  <h6>{localStorage.getItem("HOD")}</h6>
                  <span>Designation</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center"
                    onClick={handleSignOut}
                    style={{
                      background: "none",
                      border: "none",
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 16px",
                    }}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span style={{ marginLeft: 8 }}>Sign Out</span>
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Example: In your main dashboard or wherever you render the form */}
      {formToShow === "addProject" && <MultiStepForm key="add" />}
      {formToShow === "projectDetails" && (
        <MultiStepForm key="edit" editData={selectedProjectData} />
      )}
    </header>
  );
};

export default Header;

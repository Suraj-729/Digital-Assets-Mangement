import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/mvpStyle.css";
import api from "../../Api";
import MultiStepForm from "../MultiStepForm"; // Adjust the import based on your file structure

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [formToShow, setFormToShow] = useState(null);
  const [selectedProjectData, setSelectedProjectData] = useState(null);
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
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
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
  const toggleProfileDropdown = () =>
    setProfileDropdownOpen((open) => !open);

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center">
          <img src="../../../images/logo.png" alt="Logo" />
        </Link>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div>

      <div className="search-bar">
        <form
          className="search-form d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div> 

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <Link className="nav-link nav-icon search-bar-toggle" to="#">
              <i className="bi bi-search"></i>
            </Link>
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
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications show">
                <li className="dropdown-header d-flex justify-content-between align-items-center">
                  <span>
                    You have {notifications.length} new notification
                    {notifications.length !== 1 ? "s" : ""}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setDropdownOpen(false)}
                  >
                    X
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {notifications.map((note, idx) => (
                  <li key={idx} className="notification-item">
                    <i className="bi bi-exclamation-circle text-warning"></i>
                    <div>
                      <h4>{note.projectName}</h4>
                      <p>{note.message}</p>
                      <p>{note.daysLeft} days remaining</p>
                    </div>
                  </li>
                ))}
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {/* <li className="dropdown-footer text-center">
                  <Link
                    className="btn btn-sm btn-outline-primary me-2"
                    to="/notifications"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Show all notifications
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Close
                  </button>
                </li> */}
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
              onClick={e => {
                e.preventDefault();
                toggleProfileDropdown();
              }}
              onKeyDown={e => {
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
                NIC BBSR<i className="bi bi-caret-down-fill" style={{ fontSize: 12, marginLeft: 4 }}></i>
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
                  <h6>User Name</h6>
                  <span>Designation</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
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
      {formToShow === "addProject" && (
        <MultiStepForm key="add" />
      )}
      {formToShow === "projectDetails" && (
        <MultiStepForm key="edit" editData={selectedProjectData} />
      )}
    </header>
  );
};

export default Header;


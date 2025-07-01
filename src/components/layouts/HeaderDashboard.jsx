import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/mvpStyle.css";
import api from "../../Api";

const notificationIcon = (type) => {
  switch (type) {
    case "warning":
      return "bi bi-exclamation-circle text-warning";
    case "danger":
      return "bi bi-x-circle text-danger";
    case "success":
      return "bi bi-check-circle text-success";
    default:
      return "bi bi-info-circle text-primary";
  }
};

const Header = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [userName] = useState(localStorage.getItem("userName") || "User Name");
  const [designation] = useState(localStorage.getItem("designation") || "Designation");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Fetch notifications from backend (mocked here)
  useEffect(() => {
    // Replace with your actual API call if available
    async function fetchNotifications() {
      // const res = await api.get("/notifications");
      // setNotifications(res.data);
      setNotifications([
        { id: 1, type: "warning", title: "Lorem Ipsum", message: "Quae dolorem earum veritatis oditseno", time: "30 min. ago" },
        { id: 2, type: "danger", title: "Atque rerum nesciunt", message: "Quae dolorem earum veritatis oditseno", time: "1 hr. ago" },
        { id: 3, type: "success", title: "Sit rerum fuga", message: "Quae dolorem earum veritatis oditseno", time: "2 hrs. ago" },
        { id: 4, type: "primary", title: "Dicta reprehenderit", message: "Quae dolorem earum veritatis oditseno", time: "4 hrs. ago" },
      ]);
    }
    fetchNotifications();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await api.post("/users/logout");
      localStorage.clear();
      navigate("/damLogin");
    } catch {
      alert("Logout failed");
    }
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center">
          <img src="../../../images/logo.png" alt="Logo" />
        </Link>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div>

      {/* <div className="search-bar">
        <form className="search-form d-flex align-items-center" method="POST" action="#">
          <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
          <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div> */}

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <Link className="nav-link nav-icon search-bar-toggle" to="#">
              <i className="bi bi-search"></i>
            </Link>
          </li>

          {/* Notifications Dropdown */}
          <li className="nav-item dropdown">
            <Link className="nav-link nav-icon" to="#" data-bs-toggle="dropdown">
              <i className="bi bi-bell"></i>
              <span className="badge bg-primary badge-number">{notifications.length}</span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have {notifications.length} new notifications
                <Link to="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              {notifications.map((n, idx) => (
                <React.Fragment key={n.id}>
                  <li className="notification-item">
                    <i className={notificationIcon(n.type)}></i>
                    <div>
                      <h4>{n.title}</h4>
                      <p>{n.message}</p>
                      <p>{n.time}</p>
                    </div>
                  </li>
                  {idx < notifications.length - 1 && <li><hr className="dropdown-divider" /></li>}
                </React.Fragment>
              ))}
              <li className="dropdown-footer">
                <Link to="#">Show all notifications</Link>
              </li>
            </ul>
          </li>

          {/* Profile Dropdown */}
          <li className="nav-item dropdown pe-3" ref={profileRef} style={{ position: "relative" }}>
            <button
              className="nav-link nav-profile d-flex align-items-center pe-0"
              style={{ background: "none", border: "none", padding: 0 }}
              onClick={() => setProfileOpen((open) => !open)}
            >
              <img src="../../../images/profile-img.jpg" alt="Profile" className="rounded-circle" />
              <span className="d-none d-md-block dropdown-toggle ps-2">{userName}</span>
            </button>
            {profileOpen && (
              <ul
                className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
                style={{
                  display: "block",
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  minWidth: 200,
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  borderRadius: 8,
                  zIndex: 1000,
                  padding: 0,
                  margin: 0,
                  listStyle: "none"
                }}
              >
                <li className="dropdown-header" style={{ padding: "12px 16px" }}>
                  <h6 style={{ margin: 0 }}>NIC</h6>
                  <span>{designation}</span>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li><hr className="dropdown-divider" /></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center"
                    onClick={handleSignOut}
                    style={{ background: "none", border: "none", width: "100%", textAlign: "left", padding: "8px 16px" }}
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
    </header>
  );
};

export default Header;
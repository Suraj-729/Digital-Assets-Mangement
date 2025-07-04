// /* src/components/notifications/NotificationBell.jsx */
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import api from "../../Api";
// import moment from "moment";
// import "../../css/notifications.css"; // optional custom styles

// export default function NotificationBell() {
//   const [latest, setLatest] = useState([]);
//   const [open, setOpen] = useState(false);
// //   const limit = 5;

// const load = async () => {
//     try {
//       const { data } = await api.get("/notifications/latest");
//       setLatest(data);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         console.warn("Not logged in. Skipping notifications load.");
//       } else {
//         console.error("Failed to load notifications", err);
//       }
//     }
//   };
  
//   useEffect(() => {
//     load();
//   }, []);
  

//   const markRead = async (id) => {
//     await api.post(`/notifications/${id}/read`);
//     setLatest(latest.filter((n) => n._id !== id));
//   };

//   const severityIcon = (type) => {
//     if (type === "critical") return "bi-x-circle text-danger";
//     if (type === "warning")  return "bi-exclamation-circle text-warning";
//     return "bi-info-circle text-primary";
//   };

//   return (
//     <li className="nav-item dropdown">
//       <a
//         href="#"
//         className="nav-link nav-icon"
//         onClick={(e) => { e.preventDefault(); setOpen(!open); }}
//       >
//         <i className="bi bi-bell"></i>
//         {latest.length > 0 && (
//           <span className="badge bg-danger badge-number">{latest.length}</span>
//         )}
//       </a>

//       {open && (
//         <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications show">
//           <li className="dropdown-header d-flex justify-content-between align-items-center">
//             <span>{latest.length ? `Newest (${latest.length})` : "No new notifications"}</span>
//             <div>
//               <button className="btn btn-sm btn-light me-1" onClick={load}>
//                 <i className="bi bi-arrow-clockwise" />
//               </button>
//               <button className="btn btn-sm btn-outline-secondary" onClick={() => setOpen(false)}>
//                 ×
//               </button>
//             </div>
//           </li>
//           <li><hr className="dropdown-divider" /></li>

//           <div style={{ maxHeight: "300px", overflowY: "auto" }}>
//             {latest.map((n) => (
//               <li key={n._id} className="notification-item d-flex">
//                 <i className={`bi ${severityIcon(n.type)} me-2 fs-5`} />
//                 <div className="flex-grow-1">
//                   <strong>{n.assetName}</strong>
//                   <div className="small">{n.message}</div>
//                   <span className="text-muted small">
//                     {moment(n.createdAt).fromNow()}
//                   </span>
//                 </div>
//                 <button
//                   className="btn btn-sm btn-link text-decoration-none"
//                   title="mark read"
//                   onClick={() => markRead(n._id)}
//                 >
//                   ✓
//                 </button>
//               </li>
//             ))}
//           </div>

//           <li><hr className="dropdown-divider" /></li>
//           <li className="dropdown-footer text-center">
//             <Link to="/notifications" onClick={() => setOpen(false)}>
//               View all
//             </Link>
//           </li>
//         </ul>
//       )}
//     </li>
//   );
// }
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../Api";
import moment from "moment";
import "../../css/notifications.css";

export default function NotificationBell() {
  const [latest, setLatest] = useState([]);
  const [open, setOpen] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get("/notifications/latest");
      console.log("✅ Loaded notifications:", data);
      setLatest(data);
    } catch (err) {
      if (err.response?.status === 401) {
        console.warn("Not logged in. Skipping notifications load.");
      } else {
        console.error("Failed to load notifications", err);
      }
    }
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id) => {
    try {
      await api.post(`/notifications/${id}/read`);
      setLatest(latest.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const severityIcon = (type) => {
    if (type === "critical") return "bi-x-circle text-danger";
    if (type === "warning") return "bi-exclamation-circle text-warning";
    return "bi-info-circle text-primary";
  };

  // ✅ Calculate days left from expireDate or from date inside message
  const calculateDaysLeft = (notification) => {
    let dateStr = notification.expireDate;

    if (!dateStr && notification.message) {
      const match = notification.message.match(/\d{2}-[A-Za-z]{3}-\d{4}/); // e.g., 30-Jun-2025
      if (match) dateStr = match[0];
    }

    if (!dateStr) return null;

    const expiry = moment(dateStr, "DD-MMM-YYYY");
    const today = moment();
    const days = expiry.diff(today, "days");
    return days >= 0 ? days : null;
  };

  return (
    <li className="nav-item dropdown">
      <a
        href="#"
        className="nav-link nav-icon"
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        <i className="bi bi-bell"></i>
        {latest.length > 0 && (
          <span className="badge bg-danger badge-number">{latest.length}</span>
        )}
      </a>

      {open && (
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications show">
          <li className="dropdown-header d-flex justify-content-between align-items-center">
            <span>
              {latest.length
                ? `Newest (${latest.length})`
                : "No new notifications"}
            </span>
            <div>
              <button className="btn btn-sm btn-light me-1" onClick={load}>
                <i className="bi bi-arrow-clockwise" />
              </button>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>

          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {latest.map((n) => {
              const daysLeft = calculateDaysLeft(n);

              return (
                <li key={n._id || n.id} className="notification-item d-flex">
                  <i className={`bi ${severityIcon(n.type)} me-2 fs-5`} />
                  <div className="flex-grow-1">
                    <strong>{n.assetName || "Unknown Asset"}</strong>
                    <div className="small">{n.message || "No message"}</div>
                    {daysLeft !== null && (
                      <div className="text-danger fw-semibold small">
                        {daysLeft} day{daysLeft !== 1 ? "s" : ""} left until expiry
                      </div>
                    )}
                    <span className="text-muted small">
                      {moment(n.createdAt).fromNow()}
                    </span>
                  </div>
                  <button
                    className="btn btn-sm btn-link text-decoration-none"
                    title="Mark as read"
                    onClick={() => markRead(n._id || n.id)}
                  >
                    ✓
                  </button>
                </li>
              );
            })}
          </div>

         
<li>
  <hr className="dropdown-divider" />
</li>
<li className="dropdown-footer text-center">
  <button
    className="btn btn-sm btn-outline-secondary"
    onClick={() => setOpen(false)}
  >
    Close
  </button>
</li>
        </ul>
      )}
    </li>
  );
}




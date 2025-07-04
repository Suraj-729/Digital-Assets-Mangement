/* src/pages/NotificationsPage.jsx */
import { useState, useEffect } from "react";
import api from "../../Api";
import moment from "moment";
import { Link } from "react-router-dom";

export default function NotificationsPage() {
  const [all, setAll] = useState([]);
  const [filter, setFilter] = useState("all"); // all | unread | read
  const [q, setQ] = useState("");

  const load = async () => {
    const { data } = await api.get("/notifications/all");
    setAll(data);
  };
  useEffect(() => { load(); }, []);

  const markAllRead = async () => {
    await Promise.all(
      all.filter(n => !n.read).map(n => api.post(`/notifications/${n._id}/read`))
    );
    load();
  };

  const filtered = all
    .filter(n => (filter==="unread"? !n.read : filter==="read"? n.read : true))
    .filter(n => n.assetName.toLowerCase().includes(q.toLowerCase()) ||
                 n.message.toLowerCase().includes(q.toLowerCase()));

  const pill = (label,val) => (
    <button
      className={`btn btn-sm me-2 ${filter===val?"btn-primary":"btn-outline-primary"}`}
      onClick={() => setFilter(val)}
    >
      {label}
    </button>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Certificate Notifications</h3>
        <div>
          <button className="btn btn-sm btn-success me-2" onClick={markAllRead}>
            Mark all read
          </button>
          <button className="btn btn-sm btn-outline-secondary" onClick={load}>
            <i className="bi bi-arrow-clockwise" />
          </button>
        </div>
      </div>

      <div className="mb-3">
        {pill("All","all")}
        {pill("Unread","unread")}
        {pill("Read","read")}
        <input
          className="form-control d-inline-block w-auto ms-3"
          placeholder="Search…"
          value={q}
          onChange={(e)=>setQ(e.target.value)}
        />
      </div>

      <ul className="list-group">
        {filtered.map(n => (
          <li key={n._id} className={`list-group-item ${n.read?"":"list-group-item-warning"}`}>
            <div className="d-flex justify-content-between">
              <div>
                <strong>{n.assetName}</strong> – {n.message}
                <div className="small text-muted">
                  {n.daysLeft>0?`${n.daysLeft} days left`: "Expired"} • {moment(n.createdAt).fromNow()}
                </div>
              </div>
              {!n.read && (
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={async ()=>{await api.post(`/notifications/${n._id}/read`); load();}}
                >
                  Mark read
                </button>
              )}
            </div>
          </li>
        ))}
        {filtered.length===0 && <li className="list-group-item">No notifications</li>}
      </ul>

      <Link to="/" className="btn btn-link mt-4">← Back to dashboard</Link>
    </div>
  );
}

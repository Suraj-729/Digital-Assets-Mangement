
import React, { useState, useEffect } from "react";
import Header from "../components/layouts/HeaderDashboard";
import Sidebar from "../components/layouts/SidebarDashboard";
import Footer from "../components/layouts/FooterDashboard";
import MultiStepForm from "./MultiStepForm";
import ProjectTabs from "../components/ProjectDetailsView/ProjectTab";
import "../css/mvpStyle.css";
import api from "../Api";
import { toast } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { useParams } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialProjects = location.state?.fetchedProjects || [];
  const [formToShow, setFormToShow] = useState(null);
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [selectedProject, setSelectedProject] = useState(null);
  const [editProjectData, setEditProjectData] = useState(null);
  // const [filterType, setFilterType] = useState("department");
  const [filterType, setFilterType] = useState(""); // e.g., department, prismid, datacenter
  const [filterValue, setFilterValue] = useState(""); // actual selected value

  const [filteredProjects, setFilteredProjects] = useState([]);

  // Get HOD and employeeId from localStorage
  // const HOD = localStorage.getItem("HOD") || "N/A";
  // const employeeId = localStorage.getItem("employeeId") || "N/A";
  // const { employeeId, employeeType } = useParams();
  const HOD = localStorage.getItem("HOD") || "N/A";
  // const location = useLocation();
const employeeId = location.state?.employeeId || localStorage.getItem("employeeId");
const employeeType = location.state?.employeeType || localStorage.getItem("employeeType");


  const getFilterOptions = (type) => {
    if (type === "department") {
      return Array.from(
        new Set(projects.map((p) => p.deptName).filter(Boolean))
      );
    }
    if (type === "prismid") {
      return Array.from(
        new Set(projects.map((p) => p.prismId).filter(Boolean))
      );
    }
    if (type === "datacenter") {
      return Array.from(
        new Set(projects.map((p) => p.dataCentre).filter(Boolean))
      );
    }
    return [];
  };

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);


  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.get("/session-check");
        if (!res.data.loggedIn) {
          toast.error("Session expired. Please log in again.");
          localStorage.clear();
          navigate("/damLogin");
        }
      } catch (err) {
        console.error("Session check failed:", err);
      }
    };

    checkSession(); // Check once when component loads

    const interval = setInterval(checkSession, 3000000); // Every 30 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  useEffect(() => {
    if (location.state?.fetchedProjects) {
      setProjects(location.state.fetchedProjects);
    }
  }, [location.state?.fetchedProjects]);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const url = `/dashboard/by-type/${employeeId}?employeeType=${employeeType}`;
        const response = await api.get(url, { withCredentials: true });

        if (response.status >= 200 && response.status < 300) {
          setProjects(response.data);
        } else {
          // toast.error(`Failed to fetch projects. Status: ${response.status}`);
        }
      } catch (err) {
        // toast.error(`Error fetching projects: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (!initialProjects.length) {
      fetchProjects();
    } else {
      setLoading(false); // already got data via location.state
    }
  }, [employeeId, employeeType]);


  const handleProjectNameClick = async (projectName) => {
    try {
      setLoading(true);
      const response = await api.get(
        `/dashboard/projectDetails/${encodeURIComponent(projectName)}`
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Project details response:", response.data);
        setSelectedProject(response.data);
        setFormToShow("projectDetails");
      } else {
        throw new Error(`Request failed with status ${response.status}`);
        // toast.error(`Failed to load project details. Status: ${response.status}`);

      }
    } catch (err) {
      setError(err.message);
      // toast.error(`Error loading project details: ${err.message}`);

    } finally {
      setLoading(false);
    }
  };
  const handleEditProject = async (projectName) => {
    try {
      setLoading(true);
      console.log("Fetching project details for edit:", projectName);
      const response = await api.get(
        `/dashboard/projectDetails/${encodeURIComponent(projectName)}`
      );
      console.log("API response for edit:", response);
      if (response.status >= 200 && response.status < 300) {
        console.log("Project data fetched for edit:", response.data);
        setEditProjectData(response.data); // <-- This stores all previous data
        setFormToShow("addProject"); // <-- This opens the form for editing
      } else {
        console.error(`Request failed with status ${response.status}`);
        throw new Error(`Request failed with status ${response.status}`);
        // toast.error(`Failed to load project for edit. Status: ${response.status}`);

      }
    } catch (err) {
      console.error("Error fetching project for edit:", err);
      setError(err.message);
      // toast.error(`Error fetching project for edit: ${err.message}`);

    } finally {
      setLoading(false);
    }
  };

  // Add this function to handle Add Project click
  const handleAddProject = () => {
    setEditProjectData(null); // Reset edit data
    setFormToShow("addProject");
  };

  // Calculate dashboard stats from the projects data
  // const totalProjects = projects.length;
  const activeProjects = projects.filter((project) => {
    if (!project.expireDate) return false;
    const expireDate = new Date(project.expireDate);
    return expireDate > new Date();
  }).length;
  const inactiveProjects = projects.filter((project) => {
    if (!project.expireDate) return true;
    const expireDate = new Date(project.expireDate);
    return expireDate <= new Date();
  }).length;

  // Helper to get unique values for the selected filter type

  {
    filterType === "prismid" &&
      Array.from(
        new Set(projects.map((p) => p.prismId + "_" + p.assetsId)) // make it unique with another field
      )
        .filter(Boolean)
        .map((uniqueKey) => {
          const [prismId] = uniqueKey.split("_"); // extract only prismId for the label & value
          return (
            <option key={uniqueKey} value={prismId}>
              {prismId}
            </option>
          );
        });
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${date.getDate()} / ${date.toLocaleString("en-GB", {
      month: "long",
    })} / ${date.getFullYear()}`;
  };

  // Badge helpers
  const statusBadge = (status) => {
    if (status === "ACTIVE") return "badge bg-warning text-dark";
    if (status === "Expired") return "badge bg-danger";
    return "badge bg-secondary";
  };
  const auditBadge = (auditStatus) => {
    if (auditStatus && auditStatus !== "N/A") return "badge bg-success";
    return "badge bg-secondary";
  };
  const sslBadge = (sslStatus) => {
    if (sslStatus && sslStatus !== "N/A") return "badge bg-success";
    return "badge bg-secondary";
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        Error: {error}
      </div>
    );
  }

  // ✅ Static page for new users
  if (projects.length === 0 && formToShow !== "addProject") {
    return (
      <div className="d-flex" style={{ minHeight: "100vh", flexDirection: "column" }}>
        <Header />
        <div className="d-flex" style={{ flex: 1 }}>
          <Sidebar
            setFormToShow={(formType) => {
              if (formType === "addProject") handleAddProject();
              else setFormToShow(formType);
            }}
          />
          <main id="main" className="main w-100 p-3">
            <div className="pagetitle">
              <h1>Welcome to the Dashboard</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </nav>
            </div>

            <section className="section dashboard">
              <div className="card mx-auto" style={{ maxWidth: 600, marginTop: "40px" }}>
                <div className="card-body text-center">
                  <h4 className="card-title">No Projects Yet</h4>
                  <p className="text-muted">You haven't added any projects. Click below to get started.</p>
                  <button className="btn btn-primary mt-3" onClick={handleAddProject}>
                    Add Your First Project
                  </button>
                  <hr />
                  <div className="text-start mt-3">
                    <p><strong>HOD:</strong> {HOD}</p>
                    <p><strong>Employee ID:</strong> {employeeId}</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", flexDirection: "column" }}
    >
      <Header />

      <div className="d-flex" style={{ flex: 1 }}>
        <Sidebar
          setFormToShow={(formType) => {
            if (formType === "addProject") {
              handleAddProject();
            } else {
              setFormToShow(formType);
            }
          }}
        />

        <main id="main" className="main w-100 p-3">
          {formToShow === "addProject" ? (
            <section className="mt-4">
              <h3 className="mb-3">
                {editProjectData ? "Edit Project" : "Add Projects"}
              </h3>
              <MultiStepForm
                key={editProjectData ? "edit" : "add"}
                editData={editProjectData}
                onEditComplete={() => setEditProjectData(null)}
              />
            </section>
          ) : formToShow === "projectDetails" ? (
            <section className="mt-4">
              <h3 className="mb-3">Project Details</h3>
              <ProjectTabs project={selectedProject} />
            </section>
          ) : (
            <>
              <div className="pagetitle">
                <h1>Dashboard</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                </nav>
              </div>

              <section className="section dashboard">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-md-4 col-sm-6">
                        <div className="card info-card sales-card">
                          <div className="card-body d-flex align-items-center gap-3">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i className="bi bi-journal-richtext"></i>
                            </div>
                            <div>
                              <h6>{projects.length}</h6>
                            </div>
                            <h5 className="card-title">Total Projects</h5>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 col-sm-6">
                        <div className="card info-card revenue-card">
                          <div className="card-body d-flex align-items-center gap-3">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i className="bi bi-toggle-on"></i>
                            </div>
                            <div>
                              <h6>{activeProjects}</h6>
                            </div>
                            <h5 className="card-title">Active Projects</h5>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 col-sm-12">
                        <div className="card info-card customers-card">
                          <div className="card-body d-flex align-items-center gap-3">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i className="bi bi-toggle-off"></i>
                            </div>
                            <div>
                              <h6>{inactiveProjects}</h6>
                            </div>
                            <h5 className="card-title">Inactive Projects</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div
                      className="card recent-sales table-view-data overflow-auto"
                      style={{ paddingTop: "20px" }}
                    >
                      <div className="card-body pt-3">

                        <div className="row mb-4">
                          <div className="col-md-3">
                            <label className="form-label">Filter Type</label>
                            <select
                              className="form-select"
                              value={filterType}
                              onChange={(e) => {
                                const selectedType = e.target.value;
                                setFilterType(selectedType);
                                setFilterValue(""); // reset value when type changes
                                setFilteredProjects(projects); // reset filter
                              }}
                            >
                              <option value="">-- Select Filter Type --</option>
                              <option value="department">Department</option>
                              <option value="prismid">Prism ID</option>
                              <option value="datacenter">Data Center</option>
                            </select>
                          </div>


                         

                          <div className="col-md-3">
                            <label className="form-label">Filter Value</label>

                            {filterType === "prismid" ? (
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Prism ID"
                                value={filterValue}
                                onChange={async (e) => {
                                  const value = e.target.value;
                                  setFilterValue(value);

                                  if (!value) {
                                    setFilteredProjects(projects);
                                    return;
                                  }

                                  try {
                                    const res = await api.get(`/dashboard/filter/prismid/${value}`);
                                    setFilteredProjects(res.data);
                                  } catch (err) {
                                    setFilteredProjects([]);
                                  }
                                }}
                              />
                            ) : (
                              <select
                                className="form-select"
                                value={filterValue}
                                onChange={async (e) => {
                                  const value = e.target.value;
                                  setFilterValue(value);

                                  if (!filterType || !value) {
                                    setFilteredProjects(projects);
                                    return;
                                  }

                                  try {
                                    const res = await api.get(`/dashboard/filter/${filterType}/${value}`);
                                    setFilteredProjects(res.data);
                                  } catch (err) {
                                    setFilteredProjects([]);
                                  }
                                }}
                                disabled={!filterType}
                              >
                                <option value="">-- Select Value --</option>
                                {getFilterOptions(filterType).map((val) => (
                                  <option key={val} value={val}>
                                    {val}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>

                          <div className="col-md-3 d-flex align-items-end">
                            <button
                              className="btn btn-secondary w-100"
                              onClick={() => {
                                setFilterType("");
                                setFilterValue("");
                                setFilteredProjects(projects);
                              }}
                            >
                              Reset Filter
                            </button>
                          </div>
                        </div>


                        {filteredProjects.length === 0 ? (
                          <div
                            className="text-center"
                            style={{ padding: "40px 0" }}
                          >
                            <h4>No projects found.</h4>
                            <div className="mt-4">
                              <div
                                className="card mx-auto"
                                style={{ maxWidth: 400 }}
                              >
                                <div className="card-body">
                                  <h5 className="card-title mb-3">
                                    Profile Info
                                  </h5>
                                  <p>
                                    <strong>HOD Name:</strong> {HOD}
                                  </p>
                                  <p>
                                    <strong>Employee ID:</strong> {employeeId}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="table-vertical-scroll"
                            style={{ marginTop: "50px" }}
                          >
                            <table className="table table-borderless datatable">
                              <thead>
                                <tr>
                                  <th>Assets ID</th>
                                  <th>Prism ID</th>
                                  <th>Project Name</th>
                                  <th>HOD Name</th>
                                  <th>Department</th>
                                  <th>Status</th>
                                  <th>Audit Status</th>
                                  <th>Audit Expiry Date</th>
                                  <th>SSL/TLS Status</th>
                                  <th>SSL/TLS Expiry Date</th>
                                  <th>Edit</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredProjects.map((project, index) => {
                                  const key =
                                    project.assetsId ||
                                    `${project.projectName}-${index}`;
                                  const statusValue = project.expireDate
                                    ? new Date(project.expireDate) > new Date()
                                      ? "ACTIVE"
                                      : "Expired"
                                    : "N/A";

                                  return (
                                    <tr key={key}>
                                      <td>{project.assetsId || "N/A"}</td>
                                      <td>{project.prismId || "N/A"}</td>
                                      <td style={{ color: "#007bff" }}>
                                        <a
                                          href="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleProjectNameClick(
                                              project.projectName
                                            );
                                          }}
                                          style={{
                                            color: "inherit",
                                            textDecoration: "none",
                                          }}
                                        >
                                          {project.projectName || "N/A"}
                                        </a>
                                      </td>
                                      <td>{project.HOD || "N/A"}</td>
                                      <td>{project.deptName || "N/A"}</td>
                                      <td>
                                        <span
                                          className={statusBadge(statusValue)}
                                        >
                                          {statusValue}
                                        </span>
                                      </td>
                                      <td>
                                        <span
                                          className={auditBadge(
                                            project.auditStatus
                                          )}
                                        >
                                          {project.auditStatus || "N/A"}
                                        </span>
                                      </td>
                                      <td>
                                        <span>
                                          {project.expireDate
                                            ? formatDate(project.expireDate)
                                            : "N/A"}
                                        </span>
                                      </td>
                                      <td>
                                        <span
                                          className={sslBadge(
                                            project.sslStatus
                                          )}
                                        >
                                          {project.sslStatus || "N/A"}
                                        </span>
                                      </td>
                                      <td>
                                        {formatDate(project.tlsNextExpiry)}
                                      </td>
                                      <td>
                                        <button
                                          className="btn btn-sm btn-outline-primary"
                                          onClick={() =>
                                            handleEditProject(
                                              project.projectName
                                            )
                                          }
                                        >
                                          Edit
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
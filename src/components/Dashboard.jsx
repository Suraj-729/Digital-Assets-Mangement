import React, { useState, useEffect } from "react";
import Header from "../components/layouts/HeaderDashboard";
import Sidebar from "../components/layouts/SidebarDashboard";
import Footer from "../components/layouts/FooterDashboard";
import MultiStepForm from "./MultiStepForm";
import ProjectTabs from "../components/ProjectDetailsView/ProjectTab";
import "../css/mvpStyle.css";
import api from "../Api";

const Dashboard = () => {
  const [formToShow, setFormToShow] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [editProjectData, setEditProjectData] = useState(null);

  // Get HOD and employeeId from localStorage
  const HOD = localStorage.getItem("HOD") || "N/A";
  const employeeId = localStorage.getItem("employeeId") || "N/A";

  // For department/datacenter/prismId filter
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDatacenter, setSelectedDatacenter] = useState("");
  const [selectedPrismId, setSelectedPrismId] = useState("");

  // Get unique departments, datacenters, and prismIds from projects
  const departments = Array.from(
    new Set(projects.map((p) => p.deptName).filter(Boolean))
  );
  const datacenters = Array.from(
    new Set(projects.map((p) => p.datacenter).filter(Boolean))
  );

  useEffect(() => {
    // Get employeeId and employeeType from localStorage
    const employeeId = localStorage.getItem("employeeId");
    const employeeType = localStorage.getItem("employeeType");

    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Build the URL with employeeId and employeeType
        const url = `/dashboard/by-type/${employeeId}?employeeType=${employeeType}`;
        const response = await api.get(url, { withCredentials: true }); // <-- Add this option
        console.log("API response body:", response.body);
        console.log("API response data:", response.data); // <-- Add this log

        if (response.status >= 200 && response.status < 300) {
          setProjects(response.data);
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
      }
    } catch (err) {
      setError(err.message);
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
      }
    } catch (err) {
      console.error("Error fetching project for edit:", err);
      setError(err.message);
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
  const totalProjects = projects.length;
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

  const filteredProjects =
    filter === "all"
      ? projects
      : filter === "active"
      ? projects.filter((project) => {
          if (!project.expireDate) return false;
          const expireDate = new Date(project.expireDate);
          return expireDate > new Date();
        })
      : filter === "inactive"
      ? projects.filter((project) => {
          if (!project.expireDate) return true;
          const expireDate = new Date(project.expireDate);
          return expireDate <= new Date();
        })
      : filter === "departmentwise"
      ? projects.filter(
          (project) =>
            selectedDepartment && project.deptName === selectedDepartment
        )
      : filter === "datacenter"
      ? projects.filter(
          (project) =>
            selectedDatacenter && project.datacenter === selectedDatacenter
        )
      : filter === "prismid"
      ? projects.filter(
          (project) => selectedPrismId && project.prismId === selectedPrismId
        )
      : projects;

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
    if (status === "Valid") return "badge bg-warning text-dark";
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

  if (formToShow === "projectDetails" && !selectedProject) {
    return (
      <div className="alert alert-warning m-4" role="alert">
        No project data available. Please try selecting a project again.
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
                                  // Status logic
                                  let statusValue = "N/A";
                                  if (project.expireDate) {
                                    statusValue =
                                      new Date(project.expireDate) > new Date()
                                        ? "Valid"
                                        : "Expired";
                                  }
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
                                      {/* <td>
                                        <span
                                          className={
                                            project.auditExpiry
                                              ? (() => {
                                                  const expiry = new Date(
                                                    project.auditExpiry
                                                  );
                                                  const now = new Date();
                                                  if (expiry < now)
                                                    return "badge bg-danger";
                                                  if (
                                                    (expiry - now) /
                                                      (1000 * 60 * 60 * 24) <
                                                    30
                                                  )
                                                    return "badge bg-warning text-dark";
                                                  return "badge bg-success";
                                                })()
                                              : "badge bg-secondary"
                                          }
                                        >
                                          {project.auditExpiry
                                            ? formatDate(project.auditExpiry)
                                            : "N/A"}
                                        </span>
                                      </td> */}
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

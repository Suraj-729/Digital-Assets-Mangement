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

  // For department/datacenter/prismId filter
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDatacenter, setSelectedDatacenter] = useState("");
  const [selectedPrismId, setSelectedPrismId] = useState("");
  const [editProjectData, setEditProjectData] = useState(null);
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
        const response = await api.get(url);

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
      setFormToShow("addProject");       // <-- This opens the form for editing
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

  // Filter projects based on selected filter
  // const filteredProjects =
  //   filter === "all"
  //     ? projects
  //     : filter === "active"
  //     ? projects.filter((project) => {
  //         if (!project.expireDate) return false;
  //         const expireDate = new Date(project.expireDate);
  //         return expireDate > new Date();
  //       })
  //     : projects.filter((project) => {
  //         if (!project.expireDate) return true;
  //         const expireDate = new Date(project.expireDate);
  //         return expireDate <= new Date();
  //       });
  // Filter projects based on selected filter
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
        <Sidebar setFormToShow={setFormToShow} />

        <main id="main" className="main w-100 p-3">
          {formToShow === "addProject" ? (
            <section className="mt-4">
              <h3 className="mb-3">
                {editProjectData ? "Edit Project" : "Add Projects"}
              </h3>
              <MultiStepForm
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
                              <h6>{totalProjects}</h6>
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
                        <div className="d-flex justify-content-between mb-3">
                          <div className="filter-by-con d-flex gap-2 align-items-center">
                            <select
                              className="form-select"
                              value={filter}
                              onChange={(e) => setFilter(e.target.value)}
                            >
                              <option value="all">All Projects</option>
                              <option value="active">Active Projects</option>
                              <option value="inactive">
                                Inactive Projects
                              </option>
                              <option value="departmentwise">
                                Departmentwise
                              </option>
                              {/* <option value="datacenter">Datacenter</option> */}
                              <option value="prismid">Prism ID</option>
                            </select>
                            {filter === "departmentwise" && (
                              <select
                                className="form-select"
                                value={selectedDepartment}
                                onChange={(e) =>
                                  setSelectedDepartment(e.target.value)
                                }
                              >
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                  <option key={dept} value={dept}>
                                    {dept}
                                  </option>
                                ))}
                              </select>
                            )}
                            {filter === "datacenter" && (
                              <select
                                className="form-select"
                                value={selectedDatacenter}
                                onChange={(e) =>
                                  setSelectedDatacenter(e.target.value)
                                }
                              >
                                <option value="">Select Datacenter</option>
                                {datacenters.map((dc) => (
                                  <option key={dc} value={dc}>
                                    {dc}
                                  </option>
                                ))}
                              </select>
                            )}
                            {filter === "prismid" && (
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Prism ID"
                                value={selectedPrismId}
                                onChange={(e) =>
                                  setSelectedPrismId(e.target.value)
                                }
                              />
                            )}
                          </div>
                          {/* <div>
                            <button className="btn btn-primary">
                              <i className="bi bi-download"></i> Export
                            </button>
                          </div> */}
                        </div>

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
                                    <td style={{ color: "#007bff" }}>
                                      {project.prismId || "N/A"}
                                    </td>
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
                                    </td>
                                    <td>
                                      <span
                                        className={sslBadge(project.sslStatus)}
                                      >
                                        {project.sslStatus || "N/A"}
                                      </span>
                                    </td>
                                    <td>{formatDate(project.tlsNextExpiry)}</td>
                                    <td>
                                      <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() =>
                                          handleEditProject(project.projectName)
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

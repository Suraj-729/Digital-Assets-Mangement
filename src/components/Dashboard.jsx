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

  // Get unique departments, datacenters, and prismIds from projects
  const departments = Array.from(
    new Set(projects.map((p) => p.deptName).filter(Boolean))
  );
  const datacenters = Array.from(
    new Set(projects.map((p) => p.datacenter).filter(Boolean))
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/dashboard/dataSio");
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
          (project) => selectedDepartment && project.deptName === selectedDepartment
        )
      : filter === "datacenter"
      ? projects.filter(
          (project) => selectedDatacenter && project.datacenter === selectedDatacenter
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
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Determine audit status badge
  const getAuditStatusBadge = (expireDate) => {
    if (!expireDate) return "bg-secondary";
    const today = new Date();
    const expiry = new Date(expireDate);
    const daysDiff = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) return "bg-danger";
    if (daysDiff < 30) return "bg-warning";
    return "bg-success";
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
              <h3 className="mb-3">Add Projects</h3>
              <MultiStepForm />
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
                              <option value="inactive">Inactive Projects</option>
                              <option value="departmentwise">Departmentwise</option>
                              {/* <option value="datacenter">Datacenter</option> */}
                              <option value="prismid">Prism ID</option>
                            </select>
                            {filter === "departmentwise" && (
                              <select
                                className="form-select"
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
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
                                onChange={(e) => setSelectedDatacenter(e.target.value)}
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
                                onChange={(e) => setSelectedPrismId(e.target.value)}
                              />
                            )}
                          </div>
                          <div>
                            <button className="btn btn-primary">
                              <i className="bi bi-download"></i> Export
                            </button>
                          </div>
                        </div>

                        <div className="table-vertical-scroll">
                          <table className="table table-borderless datatable">
                            <thead>
                              <tr>
                                <th>Assets ID</th>
                                <th>Prism ID</th>
                                <th>Project Name</th>
                                <th>HOD</th>
                                <th>Department</th>
                                <th>Audit Status</th>
                                <th>Audit Expiry</th>
                                <th>SSL/TLS expiry date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredProjects.map((project, index) => {
                                const key = project.assetsId || `${project.projectName}-${index}`;
                                return (
                                  <tr key={key}>
                                    <td>{project.assetsId || "N/A"}</td>
                                    <td>{project.prismId || "N/A"}</td>
                                    <td>
                                      <a
                                        href="#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleProjectNameClick(project.projectName);
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
                                      <span className={`badge ${getAuditStatusBadge(project.expireDate)}`}>
                                        {project.expireDate
                                          ? new Date(project.expireDate) > new Date()
                                            ? "Valid"
                                            : "Expired"
                                          : "N/A"}
                                      </span>
                                    </td>
                                    <td>{formatDate(project.expireDate)}</td>
                                    <td>{formatDate(project.tlsNextExpiry)}</td>
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
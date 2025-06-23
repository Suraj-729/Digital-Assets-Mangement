// import React, { useState } from "react";
// import Header from "../components/layouts/HeaderDashboard";
// import Sidebar from "../components/layouts/SidebarDashboard";
// import Footer from "../components/layouts/FooterDashboard";
// import MultiStepForm from "./MultiStepForm";
// import ProjectTabs from "../components/ProjectDetailsView/ProjectTab";
// import "../css/mvpStyle.css";

// const Dashboard = () => {
//   // const [showForm, setShowForm] = useState(false);
//   const [formToShow, setFormToShow] = useState(null);
  
//   return (
//     <div
//       className="d-flex"
//       style={{ minHeight: "100vh", flexDirection: "column" }}
//     >
//       <Header />

//       <div className="d-flex" style={{ flex: 1 }}>
//         <Sidebar setFormToShow={setFormToShow} />

//         <main id="main" className="main w-100 p-3">
//           {formToShow === "addProject" ? (
//             <section className="mt-4">
//               <h3 className="mb-3">Add Projects</h3>
//               <MultiStepForm />
//             </section>
//           ) : formToShow === "projectDetails" ? (
//             <section className="mt-4">
//               <h3 className="mb-3">Project Details</h3>
//               <ProjectTabs />
//             </section>
//           ) : (
//             <>
//               {/* Page Title */}
//               <div className="pagetitle">
//                 <h1>Dashboard</h1>
//                 <nav>
//                   <ol className="breadcrumb">
//                     <li className="breadcrumb-item">
//                       <a href="/">Home</a>
//                     </li>
//                     <li className="breadcrumb-item active">Dashboard</li>
//                   </ol>
//                 </nav>
//               </div>

//               {/* Dashboard Cards */}
//               <section className="section dashboard">
//                 <div className="row">
//                   <div className="col-lg-12">
//                     <div className="row">
//                       <div className="col-md-4 col-sm-6">
//                         <div className="card info-card sales-card">
//                           <div className="card-body d-flex align-items-center gap-3">
//                             <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
//                               <i className="bi bi-journal-richtext"></i>
//                             </div>
//                             <div>
//                               <h6>145</h6>
//                             </div>
//                             <h5 className="card-title">Total Projects</h5>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-md-4 col-sm-6">
//                         <div className="card info-card revenue-card">
//                           <div className="card-body d-flex align-items-center gap-3">
//                             <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
//                               <i className="bi bi-toggle-on"></i>
//                             </div>
//                             <div>
//                               <h6>45</h6>
//                             </div>
//                             <h5 className="card-title">Active Projects</h5>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-md-4 col-sm-12">
//                         <div className="card info-card customers-card">
//                           <div className="card-body d-flex align-items-center gap-3">
//                             <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
//                               <i className="bi bi-toggle-off"></i>
//                             </div>
//                             <div>
//                               <h6>12</h6>
//                             </div>
//                             <h5 className="card-title">Inactive Projects</h5>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Table Section */}
//                   <div className="col-12">
//                     <div
//                       className="card recent-sales table-view-data overflow-auto"
//                       style={{ paddingTop: "20px" }}
//                     >
//                       <div className="card-body pt-3">
//                         <div className="filter-by-con mb-2">
//                           <select className="form-select">
//                             <option>Filter by</option>
//                             <option>Departments</option>
//                             <option>Datacentre</option>
//                           </select>
//                         </div>

//                         <div className="table-vertical-scroll">
//                           <table className="table table-borderless datatable">
//                             <thead>
//                               <tr>
//                                 <th>Prism ID</th>
//                                 <th>Project Name</th>
//                                 <th>Group Head Name</th>
//                                 <th>Department</th>
//                                 <th>Status</th>
//                                 <th>Audit Status</th>
//                                 <th>Audit expiry date</th>
//                                 <th>SSL/TLS</th>
//                                 <th>SSL/TLS expiry date</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               <tr>
//                                 <td>
//                                   <a href="/">#2457</a>
//                                 </td>
//                                 <td>Project 1</td>
//                                 <td>
//                                   <a href="/">Group Head 1</a>
//                                 </td>
//                                 <td>Department 4</td>
//                                 <td>
//                                   <span className="badge bg-warning">
//                                     Pending
//                                   </span>
//                                 </td>
//                                 <td>
//                                   <span className="badge bg-success">
//                                     Completed
//                                   </span>
//                                 </td>
//                                 <td>12 / June / 2027</td>
//                                 <td>
//                                   <span className="badge bg-warning">
//                                     Pending
//                                   </span>
//                                 </td>
//                                 <td>12 / June / 2027</td>
//                               </tr>
//                               <tr>
//                                 <td>
//                                   <a href="/">#2147</a>
//                                 </td>
//                                 <td>Project 2</td>
//                                 <td>
//                                   <a href="/">Group Head 2</a>
//                                 </td>
//                                 <td>Department 1</td>
//                                 <td>
//                                   <span className="badge bg-warning">
//                                     Pending
//                                   </span>
//                                 </td>
//                                 <td>
//                                   <span className="badge bg-success">
//                                     Completed
//                                   </span>
//                                 </td>
//                                 <td>12 / June / 2028</td>
//                                 <td>
//                                   <span className="badge bg-warning">
//                                     Pending
//                                   </span>
//                                 </td>
//                                 <td>12 / June / 2028</td>
//                               </tr>
//                               <tr>
//                                 <td>
//                                   <a href="/">#2049</a>
//                                 </td>
//                                 <td>Project 3</td>
//                                 <td>
//                                   <a href="/">Group Head 3</a>
//                                 </td>
//                                 <td>Department 2</td>
//                                 <td>
//                                   <span className="badge bg-danger">
//                                     Rejected
//                                   </span>
//                                 </td>
//                                 <td>
//                                   <span className="badge bg-success">
//                                     Completed
//                                   </span>
//                                 </td>
//                                 <td>12 / June / 2027</td>
//                                 <td>
//                                   <span className="badge bg-danger">
//                                     Rejected
//                                   </span>
//                                 </td>
//                                 <td>12 / June / 2027</td>
//                               </tr>
//                               <tr>
//                                 <td>
//                                   <a href="/">#2644</a>
//                                 </td>
//                                 <td>Project 4</td>
//                                 <td>
//                                   <a href="/">Group Head 4</a>
//                                 </td>
//                                 <td>Department 3</td>
//                                 <td>
//                                   <span className="badge bg-danger">
//                                     Rejected
//                                   </span>
//                                 </td>
//                                 <td>
//                                   <span className="badge bg-success">
//                                     Completed
//                                   </span>
//                                 </td>
//                                 <td>12 / June / 2027</td>
//                                 <td>
//                                   <span className="badge bg-danger">
//                                     Rejected
//                                   </span>
//                                 </td>
//                                 <td>12 / June / 2027</td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </section>
//             </>
//           )}
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Dashboard;
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

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await api.get('/dashboard/dataSio');
      
      // Axios success status is in response.status (200-299)
      if (response.status >= 200 && response.status < 300) {
        setProjects(response.data); // Data is automatically in response.data
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

  // Calculate dashboard stats from the projects data
  const totalProjects = projects.length;
  const activeProjects = projects.filter(project => {
    if (!project.expireDate) return false;
    const expireDate = new Date(project.expireDate);
    return expireDate > new Date();
  }).length;
  const inactiveProjects = projects.filter(project => {
    if (!project.expireDate) return true;
    const expireDate = new Date(project.expireDate);
    return expireDate <= new Date();
  }).length;

  // Filter projects based on selected filter
  const filteredProjects = filter === "all" 
    ? projects 
    : filter === "active" 
      ? projects.filter(project => {
          if (!project.expireDate) return false;
          const expireDate = new Date(project.expireDate);
          return expireDate > new Date();
        })
      : projects.filter(project => {
          if (!project.expireDate) return true;
          const expireDate = new Date(project.expireDate);
          return expireDate <= new Date();
        });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
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
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
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

  return (
    <div className="d-flex" style={{ minHeight: "100vh", flexDirection: "column" }}>
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
              <ProjectTabs />
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
                    <div className="card recent-sales table-view-data overflow-auto" style={{ paddingTop: "20px" }}>
                      <div className="card-body pt-3">
                        <div className="d-flex justify-content-between mb-3">
                          <div className="filter-by-con">
                            <select 
                              className="form-select" 
                              value={filter}
                              onChange={(e) => setFilter(e.target.value)}
                            >
                              <option value="all">All Projects</option>
                              <option value="active">Active Projects</option>
                              <option value="inactive">Inactive Projects</option>
                            </select>
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
                              {filteredProjects.map((project) => (
                                <tr key={project.assetsId}>
                                  <td>{project.assetsId}</td>
                                  <td>{project.prismId || 'N/A'}</td>
                                  <td>{project.projectName || 'N/A'}</td>
                                  <td>{project.HOD || 'N/A'}</td>
                                  <td>{project.deptName || 'N/A'}</td>
                                  
                                  <td>
                                    <span className={`badge ${getAuditStatusBadge(project.expireDate)}`}>
                                      {project.expireDate ? 
                                        (new Date(project.expireDate) > new Date() ? 'Valid' : 'Expired') : 
                                        'N/A'}
                                    </span>
                                  </td>
                                  <td>{formatDate(project.expireDate)}</td>
                                  <td>{formatDate(project.tlsNextExpiry)}</td>
                                  
                                </tr>
                              ))}
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
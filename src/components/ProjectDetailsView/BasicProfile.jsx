// import React from "react";

// const BasicProfile = () => (
//   <div className="tab-pane fade show active profile-overview">
//     <div className="row">
//       <div className="col-md-12">
//         <div className="project-details">
//           <div className="row mb-3">
//             <div className="col-md-4 col-xxl-3"><p>Project Name: <b>Project</b></p></div>
//             <div className="col-md-4 col-xxl-3"><p>PRISM ID: <b>#16458655</b></p></div>
//             <div className="col-md-4 col-xxl-3"><p>Department Name: <b>Department</b></p></div>
//             <div className="col-md-4 col-xxl-3"><p>URL: <b><a href="https://seedtrace.gov.in/" target="_blank" rel="noreferrer">https://seedtrace.gov.in/</a></b></p></div>
//             <div className="col-md-4 col-xxl-3"><p>Public IP: <b>8.107.677.0</b></p></div>
//           </div>
//           <div className="row">
//             <div className="col-md-6">
//               <h5>Nodal Officer from NIC:</h5>
//               <div className="nodal_officer_data">
//                 <p>Name: <b>Name Goes here</b></p>
//                 <p>Emp Code: <b>#245613</b></p>
//                 <p>Mob: <b>1234 546 133</b></p>
//                 <p>Email: <b>example@gmail.com</b></p>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <h5>Nodal Officer from Department:</h5>
//               <div className="nodal_officer_data">
//                 <p>Name: <b>Name Goes here</b></p>
//                 <p>Emp Code: <b>#245613</b></p>
//                 <p>Mob: <b>1234 546 133</b></p>
//                 <p>Email: <b>example@gmail.com</b></p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default BasicProfile;
import React from "react";
import PropTypes from "prop-types";

const BasicProfile = ({ project }) => {
  // If no project data is provided, show a loading state or empty fields
  if (!project) {
    return (
      <div className="tab-pane fade show active profile-overview">
        <div className="alert alert-info">Loading project details...</div>
      </div>
    );
  }

  return (
    <div className="tab-pane fade show active profile-overview">
      <div className="row">
        <div className="col-md-12">
          <div className="project-details">
            <div className="row mb-3">
              <div className="col-md-4 col-xxl-3">
                <p>Project Name: <b>{project.projectName || 'N/A'}</b></p>
              </div>
              <div className="col-md-4 col-xxl-3">
                <p>PRISM ID: <b>{project.BP?.prismId || 'N/A'}</b></p>
              </div>
              <div className="col-md-4 col-xxl-3">
                <p>Department Name: <b>{project.BP?.deptName || 'N/A'}</b></p>
              </div>
              <div className="col-md-4 col-xxl-3">
                <p>URL: <b>
                  {project.BP?.url ? (
                    <a href={project.BP.url} target="_blank" rel="noreferrer">
                      {project.BP.url}
                    </a>
                  ) : 'N/A'}
                </b></p>
              </div>
              <div className="col-md-4 col-xxl-3">
                <p>Public IP: <b>{project.BP?.publicIp || 'N/A'}</b></p>
              </div>
              <div className="col-md-4 col-xxl-3">
                <p>HOD Name: <b>{project.BP?.HOD || 'N/A'}</b></p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <h5>Nodal Officer from NIC:</h5>
                <div className="nodal_officer_data">
                  <p>Name: <b>{project.BP?.nodalOfficerNIC?.name || 'N/A'}</b></p>
                  <p>Emp Code: <b>{project.BP?.nodalOfficerNIC?.empCode || 'N/A'}</b></p>
                  <p>Mob: <b>{project.BP?.nodalOfficerNIC?.mobile || 'N/A'}</b></p>
                  <p>Email: <b>{project.BP?.nodalOfficerNIC?.email || 'N/A'}</b></p>
                </div>
              </div>
              <div className="col-md-6">
                <h5>Nodal Officer from Department:</h5>
                <div className="nodal_officer_data">
                  <p>Name: <b>{project.BP?.nodalOfficerDept?.name || 'N/A'}</b></p>
                  <p>Designation: <b>{project.BP?.nodalOfficerDept?.designation || 'N/A'}</b></p>
                  <p>Mob: <b>{project.BP?.nodalOfficerDept?.mobile || 'N/A'}</b></p>
                  <p>Email: <b>{project.BP?.nodalOfficerDept?.email || 'N/A'}</b></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BasicProfile.propTypes = {
  project: PropTypes.shape({
    projectName: PropTypes.string,
    BP: PropTypes.shape({
      prismId: PropTypes.string,
      deptName: PropTypes.string,
      url: PropTypes.string,
      publicIp: PropTypes.string,
      HOD: PropTypes.string,
      nodalOfficerNIC: PropTypes.shape({
        name: PropTypes.string,
        empCode: PropTypes.string,
        mobile: PropTypes.string,
        email: PropTypes.string
      }),
      nodalOfficerDept: PropTypes.shape({
        name: PropTypes.string,
        designation: PropTypes.string,
        mobile: PropTypes.string,
        email: PropTypes.string
      })
    })
  })
};

export default BasicProfile;




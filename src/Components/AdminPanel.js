// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ComplaintContext } from "../App";
// import "./AdminPanel.css";
// import { Row } from "reactstrap";

// const AdminPanel = ({ onLogout }) => {
//   const { complaints, setComplaints } = useContext(ComplaintContext);
//   const [view, setView] = useState("new"); // Track selected view
//   const navigate = useNavigate();

//   const changeStatus = (id, newStatus) => {
//     setComplaints(
//       complaints.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
//     );
//   };

//   const handleLogout = () => {
//     onLogout(); // Clear user session
//     navigate("/"); // Redirect to login page
//   };

//   // Filter complaints based on status
//   const filteredComplaints = complaints.filter((complaint) =>
//     view === "new"
//       ? complaint.status === "New"
//       : view === "pending"
//       ? complaint.status === "Pending"
//       : complaint.status === "Completed"
//   );

//   return (
//     <div className="container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <Row className="header">Admin Panel</Row>
//         <Row className="menubar">
//           <div className="sidebarnav" onClick={() => setView("new")}>
//             New Complaints
//           </div>
//           <div className="sidebarnav" onClick={() => setView("pending")}>
//             Pending Complaints
//           </div>
//           <div className="sidebarnav" onClick={() => setView("completed")}>
//             Completed Complaints
//           </div>
//           <div className="sidebarnav" onClick={handleLogout}>
//             Logout
//           </div>
//         </Row>
//       </div>

//       {/* Complaint List */}
//       <div style={{ width: "100%", height: "100%" }}>
//         <Row className="container-header">
//           {view === "new"
//             ? "New Complaints"
//             : view === "pending"
//             ? "Pending Complaints"
//             : "Completed Complaints"}
//         </Row>
//         <Row className="container-body">
//           {filteredComplaints.length > 0 ? (
//             <table className="complaint-table">
//               <thead>
//                 <tr>
//                   <th>S.no</th>
//                   <th>Student Name</th>
//                   <th>Type</th>
//                   <th>Description</th>
//                   <th>Status</th>
//                   {view === "new" ? <th>Actions</th> : null}
//                   {view === "pending" ? <th>Actions</th> : null }
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredComplaints.map((complaint, index) => (
//                   <tr key={complaint.id}>
//                     <td>{index + 1}</td>
//                     <td>{complaint.studentName}</td>
//                     <td>{complaint.type}</td>
//                     <td>{complaint.description}</td>
//                     <td>{complaint.status}</td>
//                     {view === "new" && (
//                       <td>
//                         <button
//                           onClick={() => changeStatus(complaint.id, "Pending")}
//                         >
//                           Accept
//                         </button>
//                         <button
//                           onClick={() => changeStatus(complaint.id, "Completed")}
//                         >
//                           Reject
//                         </button>
//                       </td>
//                     )}
//                     {view === "pending" && (
//                       <td>
//                         <button
//                           onClick={() => changeStatus(complaint.id, "Completed")}
//                         >
//                           Mark as Completed
//                         </button>
//                       </td>
//                     )}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 width: "100%",
//                 height: "100%",
//                 alignContent: "center",
//               }}
//             >
//               No {view === "new" ? "New" : view === "pending" ? "Pending" : "Completed"} data
//             </div>
//           )}
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComplaintContext } from "../App";
import "./AdminPanel.css";
import { Row } from "reactstrap";

const AdminPanel = ({ onLogout }) => {
  const { complaints, setComplaints } = useContext(ComplaintContext);
  const [view, setView] = useState("new"); // Track selected view
  const navigate = useNavigate();

  const changeStatus = (id, newStatus) => {
    setComplaints(
      complaints.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleLogout = () => {
    onLogout(); // Clear user session
    navigate("/"); // Redirect to login page
  };

  // Filter complaints based on status
  const filteredComplaints = complaints.filter((complaint) =>
    view === "new"
      ? complaint.status === "New"
      : view === "pending"
      ? complaint.status === "Pending"
      : view === "completed"
      ? complaint.status === "Completed"
      : complaint.status === "Rejected"
  );

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <Row className="header">Admin Panel</Row>
        <Row className="menubar">
          <div className="sidebarnav" onClick={() => setView("new")}>
            New Complaints
          </div>
          <div className="sidebarnav" onClick={() => setView("pending")}>
            Pending Complaints
          </div>
          <div className="sidebarnav" onClick={() => setView("completed")}>
            Completed Complaints
          </div>
          <div className="sidebarnav" onClick={() => setView("rejected")}>
            Rejected Complaints
          </div>
          <div className="sidebarnav" onClick={handleLogout}>
            Logout
          </div>
        </Row>
      </div>

      {/* Complaint List */}
      <div style={{ width: "100%", height: "100%" }}>
        <Row className="container-header">
          {view === "new"
            ? "New Complaints"
            : view === "pending"
            ? "Pending Complaints"
            : view === "completed"
            ? "Completed Complaints"
            : "Rejected Complaints"}
        </Row>
        <Row className="container-body">
          {filteredComplaints.length > 0 ? (
            <table className="complaint-table">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Student Name</th>
                  <th>Year</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Status</th>
                  {(view === "new" || view === "pending") && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint, index) => (
                  <tr key={complaint.id}>
                    <td>{index + 1}</td>
                    <td>{complaint.studentName}</td>
                    <td>{complaint.year}</td>
                    <td>{complaint.type}</td>
                    <td>{complaint.description}</td>
                    <td>{complaint.status}</td>
                    {view === "new" && (
                      <td>
                        <button
                          onClick={() => changeStatus(complaint.id, "Pending")}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => changeStatus(complaint.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </td>
                    )}
                    {view === "pending" && (
                      <td>
                        <button
                          onClick={() => changeStatus(complaint.id, "Completed")}
                        >
                          Mark as Completed
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                alignContent: "center",
              }}
            >
              No {view === "new" ? "New" : view === "pending" ? "Pending" : view === "completed" ? "Completed" : "Rejected"} data
            </div>
          )}
        </Row>
      </div>
    </div>
  );
};

export default AdminPanel;

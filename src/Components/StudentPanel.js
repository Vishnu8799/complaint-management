import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComplaintContext } from "../App";
import ComplaintForm from "./ComplaintForm";
import "./StudentPanel.css";
import { Row, Col } from "reactstrap";

const StudentPanel = ({ onLogout }) => {
  const { complaints, setComplaints } = useContext(ComplaintContext);
  const navigate = useNavigate();
  const [view, setView] = useState("new"); // Track selected view

  const addComplaint = (newComplaint) => {
    setComplaints([
      ...complaints,
      { ...newComplaint, status: "New", id: Date.now() },
    ]);
  };

  const handleLogout = () => {
    onLogout(); // Clear user session
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="container">
      <div className="sidebar">
        <Row className="header">Student Panel</Row>
        <Row className="menubar">
          <div className="sidebarnav" onClick={() => setView("raise")}>
            Raise Complaints
          </div>
          <div className="sidebarnav" onClick={handleLogout}>
            Logout
          </div>
        </Row>
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <Row className="container-header">
          {view === "new" ? "Raise Complaints" : "Raise Complaints"}
        </Row>
        <Row className="container-body">
          <ComplaintForm addComplaint={addComplaint} />
          <Col>
            <h3>Complaint List</h3>
            <table className="complaint-table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Student Name</th>
                  <th>Degree</th>
                  <th>Year</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint, index) => (
                  <tr key={complaint.id}>
                    <td>{index + 1}</td>
                    <td>{complaint.studentName}</td>
                    <td>{complaint.degree}</td>
                    <td>{complaint.year}</td>
                    <td>{complaint.type}</td>
                    <td>{complaint.description}</td>
                    <td>{complaint.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default StudentPanel;

import React, { useState } from "react";
import "./ComplaintForm.css"; // Make sure this path is correct

const ComplaintForm = ({ addComplaint }) => {
  const [complaint, setComplaint] = useState({
    studentName: "",
    degree: "",
    year: "",
    type: "Academic",
    description: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if all required fields are filled
    if (!complaint.studentName || !complaint.degree || !complaint.year || !complaint.description) {
      setError("Please fill out all fields.");
      return;
    }

    // Reset error and add complaint
    setError("");
    addComplaint(complaint);
    setComplaint({
      studentName: "",
      degree: "",
      year: "",
      type: "Academic",
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="complaint-form">
      {/* Show error message if validation fails */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* First Row with Three Input Fields */}
      <div className="input-row">
        <input
          type="text"
          className="input-field"
          placeholder="Student Name"
          value={complaint.studentName}
          onChange={(e) =>
            setComplaint({ ...complaint, studentName: e.target.value })
          }
        />
        <input
          type="text"
          className="input-field"
          placeholder="Degree"
          value={complaint.degree}
          onChange={(e) =>
            setComplaint({ ...complaint, degree: e.target.value })
          }
        />
        <input
          type="text"
          className="input-field"
          placeholder="Year"
          value={complaint.year}
          onChange={(e) =>
            setComplaint({ ...complaint, year: e.target.value })
          }
        />
      </div>

      {/* Second Row with Select Field, Textarea, and Submit Button */}
      <div className="input-row">
        <select
          className="select-field"
          value={complaint.type}
          onChange={(e) =>
            setComplaint({ ...complaint, type: e.target.value })
          }
        >
          <option value="Academic">Academic</option>
          <option value="Canteen">Canteen</option>
          <option value="Bus">Bus</option>
        </select>
        <textarea
          className="textarea-field"
          placeholder="Complaint Description"
          value={complaint.description}
          onChange={(e) =>
            setComplaint({ ...complaint, description: e.target.value })
          }
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ComplaintForm;

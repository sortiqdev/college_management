import React, { useState } from "react";

export default function AttendanceCreate() {

  const [filters, setFilters] = useState({
    class: "",
    department: "",
    period: ""
  });

  const students = []; // EMPTY DATA

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submit to empty API URL");

    // fetch("", { method: "POST" })

    alert("Attendance Submitted (Frontend Only)");
  };

  return (
    <div className="attendance-create-card">
      <h3>Mark Attendance</h3>

      {/* FILTER SECTION */}
      <div className="filter-section">
        <select
          onChange={(e) =>
            setFilters({ ...filters, class: e.target.value })
          }
        >
          <option value="">Select Class</option>
          <option>Class 10</option>
          <option>Class 11</option>
        </select>

        <select
          onChange={(e) =>
            setFilters({ ...filters, department: e.target.value })
          }
        >
          <option value="">Select Department</option>
          <option>Science</option>
          <option>Commerce</option>
        </select>

        <select
          onChange={(e) =>
            setFilters({ ...filters, period: e.target.value })
          }
        >
          <option value="">Select Period</option>
          <option>Period 1</option>
          <option>Period 2</option>
        </select>
      </div>

      {/* EMPTY STUDENT TABLE */}
      {students.length === 0 ? (
        <div className="empty-state">
          <p>No students found for selected filter.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Present</th>
                <th>Absent</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td><input type="radio" name={student.id} /></td>
                  <td><input type="radio" name={student.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="primary-btn">Submit</button>
        </form>
      )}
    </div>
  );
}

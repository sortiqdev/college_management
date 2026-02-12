import React, { useState } from "react";

export default function TimetableCreate() {

  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // EMPTY URL
    // fetch("", { method: "POST" })

    alert("Timetable will be saved after backend integration.");
  };

  return (
    <div className="timetable-container">

      {/* Create Form */}
      <div className="timetable-card">
        <h3>Create Timetable</h3>

        <form onSubmit={handleSubmit} className="timetable-form">

          <select required>
            <option>Select Class</option>
          </select>

          <select required>
            <option>Select Section</option>
          </select>

          <input type="text" placeholder="Subject Name" required />
          <input type="text" placeholder="Day (Mon, Tue...)" required />
          <input type="text" placeholder="Time (10:00 - 11:00)" required />

          <button type="submit">Add Period</button>

        </form>
      </div>

      {/* Existing Timetable */}
      <div className="timetable-card">
        <h3>Current Timetable</h3>

        <div className="empty-state">
          No Timetable Created Yet
        </div>
      </div>

    </div>
  );
}
